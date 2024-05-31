import { UUID } from "crypto";
import { BaseEvent } from "../event/base.event.js";
import { EventRepository } from "./event.repository.js";
import { EventModel } from "../event/event.model.js";
import { ConcurrencyException } from "../errors/concurrency-exception.js";
import { EventPropagator } from "../event/event.propagator.js";
import { EventsNotFoundException } from "../errors/events-not-found.exception.js";

export class EventStore {
  private readonly _aggregateType: string;
  private readonly _eventRepository: EventRepository;
  private readonly _eventPopagator = EventPropagator.instance;

  constructor(eventRepository: EventRepository, aggregateType: string) {
    this._eventRepository = eventRepository;
    this._aggregateType = aggregateType;
  }

  async saveEvents(aggregateId: UUID, events: BaseEvent[], expectedVersion = -1) {
    const lastEvent = await this._eventRepository.findLastEventByAggregateId(aggregateId);
    console.log(`Last persisted version for ${aggregateId}::${lastEvent?.version}`);
    if(expectedVersion != -1 && lastEvent && lastEvent.version !== expectedVersion) {
      throw new ConcurrencyException(events);
    }
    let version = expectedVersion + 1;
    for (const event of events) {
      event.version = version++;
      const aggregateData = { aggregateId, aggregateType: this._aggregateType };
      const eventModel = EventModel.fromEvent(aggregateData, event);
      await this._eventRepository.save(eventModel);
      this._eventPopagator.emit(event);
    }
  }

  async getEvents<T extends BaseEvent>(aggregateId: UUID): Promise<T[]> {
    const events = await this._eventRepository.findByAggregateId(aggregateId);
    if(events.length === 0) {
      throw new EventsNotFoundException(aggregateId);
    }
    return events.map(e => e.toEventType<T>());
  }
}
