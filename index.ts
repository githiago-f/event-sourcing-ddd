/**
 * This code is a test based on event-sourcing
 * with CQRS, the most part is for writing changes
 * to the aggregate.
 */

import { plainToInstance } from "class-transformer";
import { NewSaleCommand } from "./src/commands/new-sale.command.js";
import { EventStore } from "./src/common/domain/event-store.service.js";
import { randomUUID } from "crypto";
import { SaleEventSourcingHandler } from "./src/domain/sales/handlers/sale-event-sourcing.handler.js";
import { EventStoreInMemoryRespository } from "./tests/stub/repositories/event-store.repository.js";
import { SaleCommandHandler } from "./src/domain/sales/handlers/sale-command.handler.js";

const repository = new EventStoreInMemoryRespository();

const eventStore = new EventStore(repository, 'SaleAggregate');

const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

const saleCommandHandler = new SaleCommandHandler(eventSourcingHandler);

const command = plainToInstance(NewSaleCommand, {
  productCode: 'code-1',
  recipientId: randomUUID(),
  financialResponsibleId: undefined
});

saleCommandHandler.handleNewSale(command);


