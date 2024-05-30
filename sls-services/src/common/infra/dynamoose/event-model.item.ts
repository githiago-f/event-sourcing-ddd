import { EventModel } from "cqrs";
import { type Item } from "dynamoose/dist/Item.js";

export interface EventModelItem extends Item, EventModel {}
