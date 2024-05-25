import { AggregateRoot } from "../../common/domain/aggregate-root";
import { Charge } from "./charge";
import { Client } from "./client";
import { Product } from "./product";
import { SaleStatus } from "./vo/sale-status";
import { EventApplier } from "../../common/decorators/aggregate-methods";
import { NewSaleEvent } from "./events/new-sale.event";
import { NewSaleCommand } from "../../commands/new-sale.command";
import { SaleInsertedEvent } from "./events/sale-inserted.event";
import { plainToInstance } from "class-transformer";

export class SaleAggregate extends AggregateRoot {
  private _product!: Product;
  private _status!: SaleStatus;
  public readonly charges!: Set<Charge>;
  public readonly recipient!: Client;
   /** if not informed, must be same as recipient */
  public readonly financialResponsible?: Client;

  constructor(command: NewSaleCommand) {
    super(command.id);
    this.charges = new Set();
    this.raiseEvent(NewSaleEvent.fromCommand(command));
  }

  get status() { return this._status; }
  get product() { return this._product; }

  @EventApplier("NewSaleEvent")
  private applySaleCreation(event: NewSaleEvent) {
    this._logger.log('New sale creation::', event);
    this._product = plainToInstance(Product, {
      code: event.productCode
    });

    this._logger.log('Inserted sale for product::', this.product);
  }

  @EventApplier("SaleInsertedEvent")
  private applySaleInsertion(event: SaleInsertedEvent) {
    this._logger.log('New sale creation::', event);
  }

  @EventApplier("ChargeInsertionEvent")
  private applyChargeInserted(event: void) {
  }

  @EventApplier("InitiateAnalysisEvent")
  private applyAnalysis(event: void) {
  }
}
