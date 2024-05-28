import { ChargeStatus } from "./vo/charge-status.js";

/**
 * maybe should be an aggregate too and keep
 * a history of every change on this object.
 */
export class Charge {
    public readonly id: any;
    private _status!: ChargeStatus;

    constructor(identity: any) {
        this.id = identity;
        this._status = ChargeStatus.ANALYSIS;
    }

    get status() {
        return this._status;
    }
}
