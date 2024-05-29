/**
 * This code is a test based on event-sourcing
 * with CQRS, the most part is for writing changes
 * to the aggregate.
 */
import { plainToInstance } from "class-transformer";
import { EventStore } from "cqrs/domain/event-store.service.js";
import { EventRepository } from "cqrs/domain/event.repository.js";
import { EventModel } from "cqrs/event/event.model.js";
import { randomUUID, UUID } from "crypto";
import { SaleEventSourcingHandler } from 'sale-core/domain/sales/handlers/sale-event-sourcing.handler.js';
import { SaleCommandHandler } from 'sale-core/domain/sales/handlers/sale-command.handler.js';
import { NewSaleCommand } from "sale-core/commands/new-sale.command.js";

class Repository implements EventRepository {
  async save(event: EventModel): Promise<void> {
  }

  async findByAggregateId(aggregateId: UUID): Promise<EventModel[]> {
    return [];
  }
}

const eventStore = new EventStore(new Repository(), 'SaleAggregate');
const eventSourcingHandler = new SaleEventSourcingHandler(eventStore);

const saleCommandHandler = new SaleCommandHandler(eventSourcingHandler);

export const handler = async () => {
  const command = plainToInstance(NewSaleCommand, {
    productCode: 'code-1',
    recipientId: randomUUID(),
    financialResponsibleId: undefined
  });

  await saleCommandHandler.handleNewSale(command);
}

