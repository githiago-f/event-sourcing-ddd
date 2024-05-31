import { BaseCommand } from "cqrs";
import { UUID } from "crypto";
import { ReferenceMonth } from "../domain/sales/vo/reference-month.js";

export class ChargeInsertionCommand extends BaseCommand {
  public readonly name = 'ChargeInsertionCommand';
  public readonly chargeId!: UUID;
  public readonly referenceMonth!: ReferenceMonth;
}
