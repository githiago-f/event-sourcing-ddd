import { AggregateRoot } from "../../common/domain/aggregate-root.js";
import { Charge } from "./charge.js";
import { Client } from "./client.js";
import { Product } from "./product.js";
import { SaleStatus } from "./vo/sale-status.js";
import { EventApplier } from "../../common/decorators/aggregate-methods.js";
import { NewSaleEvent } from "./events/new-sale.event.js";
import { NewSaleCommand } from "../../commands/new-sale.command.js";
import { Expose, plainToInstance } from "class-transformer";
import { UUID } from "crypto";

export class SaleAggregate extends AggregateRoot {
  private _product!: Product;
  private _status!: SaleStatus;
  public readonly charges!: Set<Charge>;
  private _recipient!: Client;
   /** if not informed, must be same as recipient */
  private _financialResponsible?: Client;

  constructor(command?: NewSaleCommand, id?: UUID) {
    super(id);
    this.charges = new Set();
    if(command !== undefined) {
      this.raiseEvent(NewSaleEvent.fromCommand(command));
    }
  }

  @Expose()
  get financialResponsible() {
    return this._financialResponsible;
  }
  @Expose()
  get recipient() { return this._recipient; }
  @Expose()
  get status() { return this._status; }
  @Expose()
  get product() { return this._product; }

  @EventApplier("NewSaleEvent")
  private applySaleCreation(event: NewSaleEvent) {
    this._logger.log('New sale creation::', event);
    this._status = SaleStatus.PROCESSING;
    this._product = plainToInstance(Product, {
      code: event.productCode
    } as Product);
    this._recipient = plainToInstance(Client, {
      id: event.recipientId
    } as Client);
    if(event.financialResponsibleId) {
      this._financialResponsible = plainToInstance(Client, {
        id: event.financialResponsibleId
      } as Client);
    }
  }
}
