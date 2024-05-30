import { UUID } from "crypto";
import { EventModel } from "../event/event.model.js";

/**
 * Should be implemented for a NOSQL
 * key-value database (eg.: DynamoDB, MongoDB or Other)
 */
export interface EventRepository {
  save(event: EventModel): Promise<void>;
  findByAggregateId(aggregateId: UUID): Promise<EventModel[]>;
}
