import { BaseCommand } from "./base.command";

export type CommandHandler = <T extends BaseCommand>(command: T) => void
