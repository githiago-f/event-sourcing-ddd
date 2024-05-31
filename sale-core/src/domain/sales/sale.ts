import { Charge } from "./charge.js";
import { Client } from "../client/client.js";
import { Product } from "./product.js";
import { SaleStatus } from "./vo/sale-status.js";
import { EventApplier, AggregateRoot } from "cqrs";
import { NewSaleEvent } from "./events/new-sale.event.js";
import { Expose, plainToInstance } from "class-transformer";
import { UUID, randomUUID } from "crypto";
import { ChargeInsertionEvent } from "./events/charge-insertion.event.js";
import { NewSaleCommand } from "../../commands/new-sale.command.js";
import { ReferenceMonth } from "./vo/reference-month.js";

export class SaleAggregate extends AggregateRoot {
  private _product!: Product;
  private _status!: SaleStatus;
  private _chargeHistory!: Set<Charge>;
  private _recipient!: Client;
   /** if not informed, must be same as recipient */
  private _financialResponsible?: Client;

  constructor(command?: NewSaleCommand, id?: UUID) {
    super(id);
    this._chargeHistory = new Set();
    if(command !== undefined) {
      this.raiseEvent(NewSaleEvent.fromCommand(command));
    }
  }

  @Expose()
  get financialResponsible() {
    return this._financialResponsible;
  }
  @Expose()
  get charges() { return this._chargeHistory; }
  @Expose()
  get recipient() { return this._recipient; }
  @Expose()
  get status() { return this._status; }
  @Expose()
  get product() { return this._product; }

  public addCharge(chargeIdentity: string, referenceMonth: ReferenceMonth) {
    const event = plainToInstance(ChargeInsertionEvent, {
      chargeIdentity,
      referenceMonth
    });
    this.raiseEvent(event);
  }

  @EventApplier("NewSaleEvent")
  private applySaleCreation(event: NewSaleEvent) {
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

  @EventApplier("ChargeInsertionEvent")
  private applyChargeInsertion(event: ChargeInsertionEvent) {
    this._status = SaleStatus.BILLING;
    const charge = new Charge(event.chargeIdentity, event.referenceMonth);
    this._chargeHistory.add(charge);
  }
}
