import { EventModelItem } from "./event-model.item.js";
import dynamoose from 'dynamoose';

const eventSchema = new dynamoose.Schema({
  id: { type: String, required: true, hashKey: true },
  version: { type: Number, rangeKey: true },
  aggregateId: { type: String },
  aggregateType: String,
  createdAt: { type: {value: Date, settings: { value: "iso" }} },
  eventData: String,
  eventType: String,
});

const schemaName = process.env.EVENT_STORE ?? 'event-store-table';

export const EventDynamooseModel = dynamoose.model<EventModelItem>(schemaName, eventSchema, {
  create: false,
  waitForActive: false,
});
