import {BotCommand} from './command';
import {Context} from 'telegraf';

export class MenuCommand implements BotCommand {
  readonly name = 'menu';

  execute(ctx: Context) {
    if (!ctx.from) return;
  }
}
