import 'dotenv/config';
import {Telegraf} from 'telegraf';
import {AppLogger} from './logger';
import {Bot} from './bot/bot';
import {getEnv} from './utils';
import {migrate, openDB} from './database';
import {Sheduler} from './sheduler/sheduler';
import {UserMiddleware} from './bot/middlewares/user.middleware';

async function bootstrap() {
  const telegraf = new Telegraf(getEnv('BOT_TOKEN'), {});
  const logger = new AppLogger();

  const sqlite = await openDB();
  await migrate(sqlite).catch(err => logger.fatal(err));

  const userMiddleware = new UserMiddleware(sqlite);

  telegraf.use(userMiddleware.middleware());

  const sheduler = new Sheduler(sqlite);
  const bot = new Bot(telegraf, logger);

  await bot.start();
}

bootstrap();
