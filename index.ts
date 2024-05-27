import { plainToInstance } from "class-transformer";
import { NewSaleCommand } from "./src/commands/new-sale.command";
import { SaleAggregate } from "./src/domain/sales/sale";
import { EventStore } from "./src/common/domain/event-store.service";
import { randomUUID } from "crypto";
import { SaleEventSourcingHandler } from "./src/domain/sales/handlers/sale-event-sourcing.handler";
import { EventStoreInMemoryRespository } from "./tests/stub/repositories/event-store.repository";

const command = plainToInstance(NewSaleCommand, {
  productCode: 'code 1',
  recipientId: randomUUID(),
  financialResponsibleId: undefined
});

const sale = new SaleAggregate(command);

const repository = new EventStoreInMemoryRespository();

const eventStore = new EventStore(repository, 'SaleAggregate');

const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

await eventSourcingHandler.save(sale);

const aggregate = await eventSourcingHandler.findById(sale.id);
console.log(JSON.stringify(aggregate));
