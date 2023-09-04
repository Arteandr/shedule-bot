import {Context, Telegraf} from 'telegraf';
import {Logger} from '../logger';
import {StartCommand} from './commands/start.command';
import {MenuMiddleware} from 'telegraf-inline-menu';

export class Bot {
  constructor(
    private readonly tg: Telegraf,
    private readonly logger: Logger,
    private readonly menuMiddleware: MenuMiddleware<Context>
  ) {}

  async start() {
    this.registerCommands();
    this.tg.launch().catch(err => this.logger.fatal(err));
  }

  registerMenu() {}

  registerCommands() {
    [new StartCommand(this.menuMiddleware)].map(cmd =>
      this.tg.command(cmd.name, async ctx => {
        try {
          await cmd.execute(ctx);
        } catch (err) {
          this.logger.log(`Ошибка в команде: ${cmd.name}`);
        }
      })
    );
  }
}
