import { UUID } from "crypto";
import { AggregateRoot } from "./aggregate-root.js";

export interface EventSourcingHandler<T extends AggregateRoot> {
  findById(aggregateId: UUID): Promise<T>;
  save(aggregate: T): Promise<void>;
}
