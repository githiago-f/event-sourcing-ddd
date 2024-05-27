import { UUID, randomUUID } from "crypto";
import { getHandlerMethod } from "../decorators/aggregate-methods";
import { BaseEvent } from "../event/base.event";
import { InvalidMethodException } from "../decorators/invalid-method.exception";
import { Expose, instanceToPlain } from "class-transformer";

export abstract class AggregateRoot {
  public readonly id!: UUID;
  private _version = -1;
  private _changes!: Array<BaseEvent>;
  protected _logger = console;

  constructor(id = randomUUID()) {
    this.id = id;
    this._version = 1;
    this._changes = [];
  }

  @Expose()
  public get version() {
    return this._version;
  }

  /**
   * Changing this array will not affect the
   * `changes` property. To do that, you should
   * raise an event.
   */
  public get uncommitedChanges() {
    return new Array(...this._changes);
  }

  public markChangesAsCommited() {
    this._changes = [];
    this._logger.log("All changes got commited.");
  }

  /**
   * returns a function that receives a reference to a method
   * that will aplly this change to the aggregate object.
   *
   * Would be better if we use this with reflect meta data
   */
  protected applyChange(event: BaseEvent, isNewEvent = false) {
    try {
      if(this.version < event.version) {
        this._version = event.version;
      }
      getHandlerMethod(this, event.name)?.call(this, event);
    } catch (e) {
      if (e instanceof InvalidMethodException) {
        this._logger.error(e.message);
      } else {
        this._logger.error(
          "Error applying event to aggregate " + (e as Error).message,
        );
      }
    } finally {
      if (isNewEvent) {
        this._changes.push(event);
      }
    }
  }

  protected raiseEvent(event: BaseEvent) {
    return this.applyChange(event, true);
  }

  public replay(events?: Array<BaseEvent>) {
    return (events??this._changes).forEach((change) => this.applyChange(change));
  }

  toJSON() {
    return instanceToPlain(this, { excludePrefixes: ['_'] });
  }
}
