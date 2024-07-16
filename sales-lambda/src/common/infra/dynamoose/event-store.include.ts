import { type AggregateRoot, EVENT_STORE_KEY, EventStore, IoCContainer } from "sales-common";
import { EventStoreRepository } from "../../repositories/event-store.repository.js";
import { ClassConstructor } from "class-transformer";
import { EBAdapter } from "../eventbridge/eb.adapter.js";

export function makeEventStoreFor<T extends AggregateRoot>(aggregate: string | ClassConstructor<T>) {
  const name = typeof aggregate === 'string' ? aggregate : aggregate.name;

  const repository = new EventStoreRepository();
  const eb = new EBAdapter();

  const eventStore = new EventStore(repository, eb, name);
  IoCContainer.instance.register(EVENT_STORE_KEY, eventStore);
}
