import {Telegraf} from 'telegraf';
import {Logger} from '../logger';

export class Bot {
  constructor(
    private readonly tg: Telegraf,
    private readonly logger: Logger
  ) {}

  async start() {
    this.tg.launch().catch(err => this.logger.fatal(err));
  }
}
