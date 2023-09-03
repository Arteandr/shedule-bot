import 'dotenv/config';
import {Telegraf} from 'telegraf';
import {AppLogger} from './logger';
import {Bot} from './bot/bot';
import {getEnv} from './utils';
import {migrate, openDB} from './database';
import {Sheduler} from './sheduler/sheduler';

async function bootstrap() {
  const telegraf = new Telegraf(getEnv('BOT_TOKEN'), {});
  const logger = new AppLogger();

  const sqlite = await openDB();
  await migrate(sqlite).catch(err => logger.fatal(err));

  const sheduler = new Sheduler(sqlite);
  const bot = new Bot(telegraf, logger);

  await bot.start().then(() => sqlite.close());
}

bootstrap();
