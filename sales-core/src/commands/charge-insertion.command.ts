import { BaseCommand } from "sales-common";
import { ReferenceMonth } from "../domain/vo/reference-month.js";
import { ChargeStatus } from "../domain/vo/charge-status.js";

export class InsertChargeLogCommand extends BaseCommand {
  public readonly name = 'InsertChargeLogCommand';
  /**
   * may not be UUID
   */
  public readonly chargeId!: string;
  public readonly status?: ChargeStatus;
  public readonly referenceMonth!: ReferenceMonth;
}
