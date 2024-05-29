import { BaseCommand } from "./base.command.js";

export type CommandHandler = <T extends BaseCommand>(command: T) => void
