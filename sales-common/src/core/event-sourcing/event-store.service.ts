import { type UUID } from "crypto";
import { BaseEvent } from "../../event/base.event";
import { EventModel } from "../../event/event.model";
import { EventRepository } from "./event.repository";
import { Injectable } from '../../decorators/patterns/injectable';
import { ConcurrencyException, EventsNotFoundException } from "../../errors/index";
import { EventDispatcher } from "./event.dispatcher";

export const EVENT_STORE_KEY = 'EventStore';

/**
 * In order to use your implemention of `EventRepository` you have
 * to instantiate this by yourself and register into the `IoCContainer`.
 *
 * Usage example:
 * ```ts
 * const eventStore = new EventStore(new EventRepositoryImpl(), 'AggregateType');
 * IoCContainer.instance.register(EVENT_STORE_KEY, eventStore);
 * ```
 */
@Injectable({ key: EVENT_STORE_KEY })
export class EventStore {
  private readonly _aggregateType: string;
  private readonly _eventRepository: EventRepository;
  private readonly _eventDispatcher: EventDispatcher;

  constructor(eventRepository: EventRepository, eventDispatcher: EventDispatcher, aggregateType: string) {
    this._eventRepository = eventRepository;
    this._aggregateType = aggregateType;
    this._eventDispatcher = eventDispatcher;
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
      await this._eventDispatcher.dispatch(event);
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
