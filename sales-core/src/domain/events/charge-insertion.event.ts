import { BaseEvent, EventImpl } from "sales-common";
import { ReferenceMonth } from "../vo/reference-month.js";
import { InsertChargeLogCommand } from "../../commands/charge-insertion.command.js";
import { plainToInstance } from "class-transformer";
import { ChargeStatus } from "../vo/charge-status.js";

@EventImpl()
export class InsertChargeLogEvent extends BaseEvent {
  public readonly name = 'InsertChargeLogEvent';
  public readonly status?: ChargeStatus;
  public readonly chargeIdentity!: string;
  public readonly referenceMonth!: ReferenceMonth;

  static fromCommand(command: InsertChargeLogCommand) {
    return plainToInstance(InsertChargeLogEvent, {
      chargeIdentity: command.chargeId,
      referenceMonth: command.referenceMonth,
      status: command.status
    });
  }
}
