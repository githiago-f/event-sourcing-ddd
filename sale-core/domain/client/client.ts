import { UUID } from "crypto";
import { Instalation } from "./installation.js";

/**
 * TODO erase this comment
 * 
 * Should be called something else
 * due to the real client being the product
 * provider.
 */
export class Client {
  public readonly id!: UUID;
  public readonly instalations!: Instalation[];
}
