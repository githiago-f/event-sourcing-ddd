import { BaseEvent } from "../../../common/event/base.event.js";

export class ChargeInsertionEvent extends BaseEvent {
    public readonly name = 'ChargeInsertionEvent';
    public readonly chargeIdentity: any;
}
