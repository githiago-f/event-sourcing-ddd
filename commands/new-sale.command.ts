import { BaseEvent } from "../shared/base-event";

export class NewSaleCommand extends BaseEvent {
    public eventName = 'NewSaleCommand';
    public readonly productCode!: string;

    constructor(productCode: string) {
        super();
        this.productCode = productCode;
    }
}