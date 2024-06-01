import { InsertChargeLogEvent } from "./events/charge-insertion.event.js";
import { ChargeStatus } from "./vo/charge-status.js";
import { ReferenceMonth } from "./vo/reference-month.js";

export class ChargeLog {
  public readonly id: string;
  public readonly referenceMonth!: ReferenceMonth;
  private _status!: ChargeStatus;

  constructor(event: InsertChargeLogEvent) {
    this.id = event.chargeIdentity;
    this.referenceMonth = event.referenceMonth;
    this._status = event.status ?? ChargeStatus.ANALYSIS;
  }

  get status() {
    return this._status;
  }
}
