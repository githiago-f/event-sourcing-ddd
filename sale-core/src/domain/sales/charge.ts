import { ChargeStatus } from "./vo/charge-status.js";
import { ReferenceMonth } from "./vo/reference-month.js";

/**
 * maybe should be an aggregate too and keep
 * a history of every change on this object.
 */
export class Charge {
  public readonly id: string;
  public readonly referenceMonth!: ReferenceMonth;
  private _status!: ChargeStatus;

  constructor(identity: string, referenceMonth: ReferenceMonth) {
    this.id = identity;
    this.referenceMonth = referenceMonth;
    this._status = ChargeStatus.ANALYSIS;
  }

  get status() {
    return this._status;
  }
}
