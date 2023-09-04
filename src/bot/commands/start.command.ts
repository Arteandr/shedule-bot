import {BotCommand} from './command';
import {Context} from 'telegraf';
import {MenuMiddleware} from 'telegraf-inline-menu';

export class StartCommand implements BotCommand {
  readonly name = 'start';

  constructor(private readonly menu: MenuMiddleware<Context>) {}

  async execute(ctx: Context) {
    if (!ctx.from) return;
    await this.menu.replyToContext(ctx);
  }
}
