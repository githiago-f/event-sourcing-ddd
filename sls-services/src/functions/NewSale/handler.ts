/**
 * This code is a test based on event-sourcing
 * with CQRS, the most part is for writing changes
 * to the aggregate.
 */
import { randomUUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { SaleEventSourcingHandler, SaleCommandHandler, NewSaleCommand } from 'sale-core';
import { EventStore } from "cqrs";
import { EventStoreRepository } from "../../common/repositories/event-store.repository.js";

const eventStore = new EventStore(new EventStoreRepository(), 'SaleAggregate');
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

