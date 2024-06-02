import { EventModel } from "sales-common";
import { type Item } from "dynamoose/dist/Item.js";

export interface EventModelItem extends Item, EventModel {}
