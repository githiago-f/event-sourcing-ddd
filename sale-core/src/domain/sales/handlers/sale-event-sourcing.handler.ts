import { UUID } from "crypto";
import { SaleAggregate } from "../sale.js";
import { EventStore, EventSourcingHandler } from "cqrs";

export class SaleEventSourcingHandler implements EventSourcingHandler<SaleAggregate> {
  private readonly _eventStore: EventStore;

  constructor(eventStore: EventStore) {
    this._eventStore = eventStore;
  }

  async findById(aggregateId: UUID): Promise<SaleAggregate> {
    const events = await this._eventStore.getEvents(aggregateId);
    const aggregate = new SaleAggregate(undefined, aggregateId);
    aggregate.replay(events);
    return aggregate;
  }

  async save(aggregate: SaleAggregate): Promise<SaleAggregate> {
    await this._eventStore.saveEvents(aggregate.id, aggregate.uncommitedChanges, aggregate.version);
    aggregate.markChangesAsCommited();
    return aggregate;
  }
}
