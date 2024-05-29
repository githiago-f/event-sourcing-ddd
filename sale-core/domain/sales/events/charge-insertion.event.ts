import { BaseEvent } from "../../../../cqrs/event/base.event.js";

export class ChargeInsertionEvent extends BaseEvent {
    public readonly name = 'ChargeInsertionEvent';
    public readonly chargeIdentity: any;
}
