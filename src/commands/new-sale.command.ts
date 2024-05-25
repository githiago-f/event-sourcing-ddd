import { BaseCommand } from "../common/command/base.command";

export class NewSaleCommand extends BaseCommand {
  readonly name = 'NewSaleCommand';
  public readonly productCode!: string;
}
