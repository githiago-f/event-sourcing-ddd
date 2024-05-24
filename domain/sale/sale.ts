import { NewChargeCommand } from "../../commands/new-charge.command";
import { NewSaleCommand } from "../../commands/new-sale.command";
import { EventApplier } from "../../shared/aggregate-methods";
import { AggregateRoot } from "../../shared/aggregate-root";
import { Charge } from "./charge";
import { Client } from "./client";
import { Product } from "./product";
import { SaleStatus } from "./vo/sale-status";

export class SaleAggregate extends AggregateRoot {
  public readonly product!: Product;
  public readonly status!: SaleStatus;
  public readonly financialResponsible?: Client;
  public readonly charges!: Set<Charge>;

  constructor(productCode: string) {
    super();
    this.status = SaleStatus.ANALYSIS;
    this.charges = new Set();
    this.raiseEvent(new NewSaleCommand(productCode));
  }

  chargeClient(chargedValue: number) {
    // TODO add validations for this method
    const command = new NewChargeCommand(chargedValue);
    this.raiseEvent(command);
  }

  @EventApplier("NewSaleCommand")
  protected applyNewSale(command: NewSaleCommand) {
    // TODO handle new sale
    console.log("New sale for product::", command.productCode);
    // TODO find product by code
  }

  @EventApplier("NewChargeCommand")
  protected applyNewCharge(command: NewChargeCommand) {
    const charge = command.toCharge();
    this.charges.add(charge);
    console.log("Applied command::", command);
    // TODO set status based on charge status and update sale version number
  }
}
