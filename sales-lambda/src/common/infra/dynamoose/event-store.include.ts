import { type AggregateRoot, EVENT_STORE_KEY, EventStore, IoCContainer } from "sales-common";
import { EventStoreRepository } from "../../repositories/event-store.repository.js";
import { ClassConstructor } from "class-transformer";

export function makeEventStoreFor<T extends AggregateRoot>(aggregate: string | ClassConstructor<T>) {
  const name = typeof aggregate === 'string' ? aggregate : aggregate.name;
  const eventStore = new EventStore(new EventStoreRepository(), name);
  IoCContainer.instance.register(EVENT_STORE_KEY, eventStore);
}
