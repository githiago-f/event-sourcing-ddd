import { plainToInstance } from "class-transformer";
import { NewSaleCommand } from "./src/commands/new-sale.command";
import { SaleAggregate } from "./src/domain/sales/sale";

const command = plainToInstance(NewSaleCommand, {
  productCode: 'code 1'
});

const sale = new SaleAggregate(command);
console.log(sale);
