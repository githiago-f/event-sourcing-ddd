import { randomUUID } from "crypto";
import { getHandlerMethod } from "./aggregate-methods";
import { BaseEvent } from "./base-event";

export abstract class AggregateRoot {
  protected id!: string;
  private _version = -1;
  private _changes!: Array<BaseEvent>;
  private logger = console;

  constructor(id = randomUUID()) {
    this.id = id;
    this._version = 1;
    this._changes = [];
  }

  public get version() {
    return this._version;
  }

  /**
   * Do not change this with pop or push commands
   */
  public get uncommitedChanges() {
    return new Array(...this._changes);
  }

  public markChangesAsCommited() {
    this._changes = [];
    this.logger.log("All changes got commited.");
  }

  /**
   * returns a function that receives a reference to a method
   * that will aplly this change to the aggregate object.
   *
   * Would be better if we use this with reflect meta data
   */
  protected applyChange(event: BaseEvent, isNewEvent = false) {
    try {
      getHandlerMethod(this, event.eventName)?.call(this, event);
    } catch (e) {
      this.logger.log(
        "Error applying event to aggregate " + (e as Error).message,
      );
    } finally {
      if (isNewEvent) {
        this._changes.push(event);
      }
    }
  }

  protected raiseEvent(event: BaseEvent) {
    return this.applyChange(event, true);
  }

  protected replay() {
    return this._changes.forEach((change) => this.applyChange(change));
  }
}
