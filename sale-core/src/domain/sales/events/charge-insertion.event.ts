import { BaseEvent } from "cqrs";

export class ChargeInsertionEvent extends BaseEvent {
  public readonly name = 'ChargeInsertionEvent';
  public readonly chargeIdentity: any;
}
