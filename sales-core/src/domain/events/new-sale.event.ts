import { plainToInstance } from "class-transformer";
import { EventImpl, BaseEvent } from "sales-common";
import { NewSaleCommand } from "../../commands/new-sale.command.js";
import { UUID } from "crypto";

@EventImpl()
export class NewSaleEvent extends BaseEvent {
  readonly name = 'NewSaleEvent';

  public readonly recipientId!: UUID;
  public readonly instalationId!: UUID;
  public readonly productCode!: string;

  static fromCommand(command: NewSaleCommand) {
    return plainToInstance(NewSaleEvent, {
      productCode: command.productCode,
      instalationId: command.instalationId,
      recipientId: command.recipientId
    } as NewSaleEvent);
  }
}
