import { UUID } from "crypto";
import { EventRepository } from "../../../src/common/domain/event.repository";
import { EventModel } from "../../../src/common/event/event.model";

export class EventStoreInMemoryRespository implements EventRepository {
  private _events: EventModel[] = [];

  async findByAggregateId(aggregateId: UUID): Promise<EventModel[]> {
    return this._events.filter(i => i.aggregateId === aggregateId);
  }

  async save(event: EventModel): Promise<void> {
    this._events.push(event);
  }
}