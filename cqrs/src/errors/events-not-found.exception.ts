import { UUID } from "crypto";

export class EventsNotFoundException extends Error {
  constructor(aggregateId: UUID) {
    super(`No events found for this aggregate id :: ${aggregateId}`);
  }
}
