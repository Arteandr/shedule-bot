import 'dotenv/config';
import {Telegraf} from 'telegraf';
import {AppLogger} from './logger';
import {Bot} from './bot/bot';
import {getEnv} from './utils';
import {migrate, openDB} from './database';
import {Sheduler} from './sheduler/sheduler';
import {UserMiddleware} from './bot/middlewares/user.middleware';
import {MenuMiddleware} from 'telegraf-inline-menu';
import {MainMenu} from './bot/menus/main.menu';
import {Repositories} from './database/repositories/repository';

async function bootstrap() {
  const telegraf = new Telegraf(getEnv('BOT_TOKEN'), {});
  const logger = new AppLogger();

  const sqlite = await openDB();
  await migrate(sqlite).catch(err => logger.fatal(err));

  // REPOSITORIES
  const repositories = new Repositories(sqlite).init();

  const userMiddleware = new UserMiddleware(repositories.users);
  const menuMiddleware = new MenuMiddleware(
    '/',
    new MainMenu(repositories.users).menu
  );

  telegraf.use(userMiddleware.middleware());
  telegraf.use(menuMiddleware);

  const sheduler = new Sheduler(sqlite);
  const bot = new Bot(telegraf, logger, menuMiddleware);

  await bot.start();
}

bootstrap();
