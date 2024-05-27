import { UUID } from "crypto";
import { EventSourcingHandler } from "../../../common/domain/event-sourcing.handler.js";
import { SaleAggregate } from "../sale.js";
import { EventStore } from "../../../common/domain/event-store.service.js";

export class SaleEventSourcingHandler implements EventSourcingHandler<SaleAggregate> {
  private readonly _eventStore: EventStore;

  constructor(eventStore: EventStore) {
    this._eventStore = eventStore;
  }

  async findById(aggregateId: UUID): Promise<SaleAggregate> {
    const aggregate = new SaleAggregate(undefined, aggregateId);
    const events = await this._eventStore.getEvents(aggregateId);
    aggregate.replay(events);
    return aggregate;
  }

  async save(aggregate: SaleAggregate): Promise<void> {
    await this._eventStore.saveEvents(aggregate.id, aggregate.uncommitedChanges, aggregate.version);
    aggregate.markChangesAsCommited();
  }
}
