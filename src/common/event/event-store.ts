import { EventModel } from "./event.model";

/**
 * Should be implemented for a NOSQL
 * key-value database (eg.: DynamoDB)
 */
export interface EventStore {
  save(event: EventModel): Promise<void>;
  findByAggregateIdentifier(aggreagateIdentifier: string): Promise<EventModel[]>;
}
