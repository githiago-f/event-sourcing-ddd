import { type UUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import { type ReferenceMonth } from "sale-core/dist/domain/sales/vo/reference-month.js";
import { ChargeInsertionCommand } from "sale-core/dist/commands/charge-insertion.command.js";

export class ChargeInsertionRequest {
  @IsUUID()
  public readonly saleId!: UUID;
  @IsString()
  @IsNotEmpty()
  public readonly chargeId!: string;
  @Matches(/^\d{2}\/\d{4}$/)
  public readonly referenceMonth!: ReferenceMonth;

  public toCommand() {
    return plainToInstance(ChargeInsertionCommand, {
      id: this.saleId,
      chargeId: this.chargeId,
      referenceMonth: this.referenceMonth
    });
  }
}
