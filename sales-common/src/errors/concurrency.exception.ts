import { BaseEvent } from "../event/base.event";

export class ConcurrencyException extends Error {
  constructor(public readonly events: BaseEvent[]) {
    super(`Could not persist ${events.length} events due to unexpected version`);
  }
}
