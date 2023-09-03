import {Telegraf} from 'telegraf';
import {Logger} from '../logger';
import {StartCommand} from './commands/start.command';

export class Bot {
  constructor(
    private readonly tg: Telegraf,
    private readonly logger: Logger
  ) {}

  async start() {
    this.registerCommands();
    this.tg.launch().catch(err => this.logger.fatal(err));
  }

  registerCommands() {
    [new StartCommand()].map(cmd =>
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
