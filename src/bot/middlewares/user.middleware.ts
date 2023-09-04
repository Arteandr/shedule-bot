import {Context} from 'telegraf';
import {UsersRepository} from '../../database/repositories/users.repository';

type ContextUpdate = (ctx: Context, next: Function) => Promise<any>;

export class UserMiddleware {
  constructor(private readonly usersRepository: UsersRepository) {}

  middleware(): ContextUpdate {
    return async (ctx, next) => {
      if (!ctx.from) return next();

      const user = await this.usersRepository.get(ctx.from.id);
      if (user) return next();
      await this.usersRepository.add(ctx.from.id);

      return next();
    };
  }
}
