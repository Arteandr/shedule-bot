import {BotCommand} from './command';
import {Context} from 'telegraf';

export class StartCommand implements BotCommand {
  readonly name = 'start';

  constructor() {}

  async execute(ctx: Context) {
    if (!ctx.from) return;

    await ctx.answerCbQuery(`Hello ${ctx.from.username}!`);
  }
}
