import { UUID } from "crypto";
import { BaseEvent } from "../event/base.event";
import { EventRepository } from "./event.repository";
import { EventModel } from "../event/event.model";

export class EventStore {
  private readonly _eventRepository: EventRepository;
  private readonly _aggregateType: string;

  constructor(eventRepository: EventRepository, aggregateType: string) {
    this._eventRepository = eventRepository;
    this._aggregateType = aggregateType;
  }

  async saveEvents(aggregateId: UUID, events: BaseEvent[], expectedVersion = -1) {
    const persistedEvents = await this._eventRepository.findByAggregateId(aggregateId);
    if(expectedVersion != -1 && persistedEvents.at(-1)?.version !== expectedVersion) {
      // TODO raise concurrency exception
    }
    let version = expectedVersion;
    for (const event of events) {
      event.version = version++;
      const aggregateData = { aggregateId, aggregateType: this._aggregateType };
      const eventModel = EventModel.fromEvent(aggregateData, event);
      await this._eventRepository.save(eventModel);
      // TODO dispatch to queue
    }
  }

  async getEvents<T extends BaseEvent>(aggregateId: UUID): Promise<T[]> {
    const events = await this._eventRepository.findByAggregateId(aggregateId);
    return events.map(e => e.toBaseEvent<T>());
  }
}
