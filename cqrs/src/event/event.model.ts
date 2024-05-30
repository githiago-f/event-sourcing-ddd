import { UUID, randomUUID } from "crypto";
import { BaseEvent } from "./base.event.js";
import { instanceToPlain, plainToInstance } from "class-transformer";

type AggregateData = {
  aggregateId: UUID;
  aggregateType: string;
}

// To be persisted
export class EventModel {
  public readonly id!: UUID;
  public readonly createdAt!: Date;
  public readonly aggregateId!: UUID;
  public readonly aggregateType!: string;
  public readonly eventType!: string;
  public readonly version!: number;
  public readonly eventData!: string;

  public static fromEvent<T extends BaseEvent>(aggregate: AggregateData, event: T): EventModel {
    const eventData = instanceToPlain(event);
    return plainToInstance(EventModel, {
      id: randomUUID(),
      aggregateId: aggregate.aggregateId,
      createdAt: new Date(),
      aggregateType: aggregate.aggregateType,
      version: event.version,
      eventType: event.name,
      eventData: JSON.stringify(eventData)
    });
  }

  public toEventType<T extends BaseEvent>(): T {
    if(!BaseEvent.events.has(this.eventType)) {
      throw new Error('Undefiend event');
    }
    const eventType = BaseEvent.events.get(this.eventType)!;
    const fromString = JSON.parse(this.eventData);
    return plainToInstance(eventType, fromString);
  }
}
