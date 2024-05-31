import { UUID } from "crypto";
import { EventModel, EventRepository } from "cqrs";
import { EventDynamooseModel } from "../infra/dynamoose/event-store.schema.js";
import { plainToInstance } from "class-transformer";

export class EventStoreRepository implements EventRepository {
  private readonly _MODEL = EventDynamooseModel;

  async findByAggregateId(aggregateId: UUID): Promise<EventModel[]> {
    console.log('Searching events');
    const data = await this._MODEL.query('aggregateId')
      .eq(aggregateId)
      .all()
      .exec()
      .then(res => res.toJSON());
    const events = data.map(i => plainToInstance(EventModel, i));
    return events;
  }

  async save(event: EventModel): Promise<void> {
    console.log("Persisting event");
    await this._MODEL.create(event);
    console.log("Event persisted");
  }

  async findLastEventByAggregateId(aggregateId: UUID): Promise<EventModel | undefined> {
    // .sort not working :(
    // check if RANGE key is needed
    const data = await this._MODEL.query('aggregateId')
      .eq(aggregateId)
      .exec();
    const res = data.toJSON().sort((a, b) => a.version - b.version);
    console.log(res);
    return plainToInstance(EventModel, res.pop());
  }
}
