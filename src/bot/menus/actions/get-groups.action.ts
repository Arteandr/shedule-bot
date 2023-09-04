import {MenuAction} from './action';
import {Context} from 'telegraf';
import {UsersRepository} from '../../../database/repositories/users.repository';

export class GetGroupsAction implements MenuAction {
  text: string = 'Группы';
  identifier: string = 'groups';

  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(ctx: Context) {
    if (!ctx.from) return false;
    return true;
  }
}
