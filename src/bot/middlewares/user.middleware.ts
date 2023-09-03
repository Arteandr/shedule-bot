import {Database} from 'sqlite';
import * as sqlite3 from 'sqlite3';
import {Context} from 'telegraf';
import {UserEntity} from '../../entities/user.entity';

type ContextUpdate = (ctx: Context, next: Function) => Promise<any>;

export class UserMiddleware {
  constructor(
    private readonly database: Database<sqlite3.Database, sqlite3.Statement>
  ) {}

  middleware(): ContextUpdate {
    return async (ctx, next) => {
      if (!ctx.from) return next();

      const user = await this.database.get<UserEntity>(
        'SELECT * FROM users where telegramId=?',
        [ctx.from.id]
      );
      if (user) return next();
      await this.database.run(
        'INSERT INTO users(telegramId) VALUES ($telegramId)',
        {
          $telegramId: ctx.from.id,
        }
      );

      return next();
    };
  }
}
