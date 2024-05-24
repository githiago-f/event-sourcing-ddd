import { Charge } from "../domain/sale/charge";
import { BaseEvent } from "../shared/base-event";

export class NewChargeCommand extends BaseEvent {
  public eventName = "NewChargeCommand";
  public readonly value: number;

  constructor(value: number) {
    super(0);
    this.value = value;
  }

  toCharge(): Charge {
    return new Charge();
  }
}
