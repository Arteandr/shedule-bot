import {Context} from 'telegraf';

export interface BotCommand {
  name: string;
  execute: (ctx: Context) => void;
}
