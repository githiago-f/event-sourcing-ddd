import { type UUID } from "crypto";
import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import { InsertChargeLogCommand, type ReferenceMonth } from "sales-core";

export class ChargeInsertionRequest {
  @IsUUID()
  public readonly saleId!: UUID;
  @IsString()
  @IsNotEmpty()
  public readonly chargeId!: string;
  @Matches(/^\d{2}\/\d{4}$/)
  public readonly referenceMonth!: ReferenceMonth;

  public toCommand() {
    return plainToInstance(InsertChargeLogCommand, {
      id: this.saleId,
      chargeId: this.chargeId,
      referenceMonth: this.referenceMonth,
    } as InsertChargeLogCommand);
  }
}
