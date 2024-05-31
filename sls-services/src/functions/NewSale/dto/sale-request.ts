import { type UUID } from "crypto";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { plainToInstance } from "class-transformer";
import { NewSaleCommand } from "sale-core";

export class SaleRequest {
  @IsString()
  public readonly productCode!: string;

  @IsUUID()
  public readonly recipientId!: UUID;

  @IsUUID()
  @IsOptional()
  public readonly financialResponsibleId!: UUID;

  toCommand() {
    return plainToInstance(NewSaleCommand, this);
  }
}
