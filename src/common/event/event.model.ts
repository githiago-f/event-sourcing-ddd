import { UUID } from "crypto";
import { BaseEvent } from "./base.event";
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
    const eventData = instanceToPlain(event, {excludePrefixes: ['_']});
    return plainToInstance(EventModel, {
      aggregateId: aggregate.aggregateId,
      createdAt: new Date(),
      aggregateType: aggregate.aggregateType,
      version: event.version,
      eventType: event.name,
      eventData: JSON.stringify(eventData)
    });
  }

  public toBaseEvent<T extends BaseEvent>(): T {
    const eventType = new Array(...BaseEvent.events.values())
      .filter(be => be.name === this.eventType)
      .pop();
    if(eventType === undefined) {
      throw new Error('Undefiend event');
    }
    const fromString = JSON.parse(this.eventData);
    return plainToInstance(eventType, fromString);
  }
}
