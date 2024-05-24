import { SaleAggregate } from "./domain/sale/sale";

const sale = new SaleAggregate("Example product");

sale.chargeClient(100);
sale.markChangesAsCommited();
