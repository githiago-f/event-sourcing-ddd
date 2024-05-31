import { BaseEvent, EventImpl } from "cqrs";
import { ReferenceMonth } from "../vo/reference-month.js";

@EventImpl()
export class ChargeInsertionEvent extends BaseEvent {
  public readonly name = 'ChargeInsertionEvent';
  public readonly chargeIdentity!: string;
  public readonly referenceMonth!: ReferenceMonth;
}
