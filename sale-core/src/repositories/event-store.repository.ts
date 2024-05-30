import { UUID } from "crypto";
import { EventRepository, EventModel } from "cqrs";

export class EventStoreInMemoryRespository implements EventRepository {
  private _events: EventModel[] = [];

  async findByAggregateId(aggregateId: UUID): Promise<EventModel[]> {
    return this._events.filter(i => i.aggregateId === aggregateId);
  }

  async save(event: EventModel): Promise<void> {
    this._events.push(event);
  }
}
