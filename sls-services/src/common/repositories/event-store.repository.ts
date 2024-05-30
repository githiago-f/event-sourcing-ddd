import { UUID } from "crypto";
import { EventModel, EventRepository } from "cqrs";
import { EventDynamooseModel } from "../infra/dynamoose/event-store.schema.js";
import { plainToInstance } from "class-transformer";

export class EventStoreRepository implements EventRepository {
  private readonly _MODEL = EventDynamooseModel;

  async findByAggregateId(aggregateId: UUID): Promise<EventModel[]> {
    console.log('Searching events');
    const data = await this._MODEL.query('id').eq(aggregateId)
      .all()
      .exec();
    console.log(`Found ${data.count} events`);
    return data.map(i => plainToInstance(EventModel, i));
  }

  async save(event: EventModel): Promise<void> {
    console.log("Persisting event");
    await this._MODEL.create(event);
    console.log("Event persisted");
  }
}
