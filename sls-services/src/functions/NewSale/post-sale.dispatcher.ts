import { PostHandler } from "cqrs";
import { NewSaleEvent } from "sale-core";

export class PostSaleDispatcher {

  @PostHandler("NewSaleEvent")
  async onNewSale(event: NewSaleEvent) {
    console.log('New sale emmited', event);
  }
}
