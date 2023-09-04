import {MenuTemplate} from 'telegraf-inline-menu';
import {Context} from 'telegraf';
import {GetGroupsAction} from './actions/get-groups.action';
import {UsersRepository} from '../../database/repositories/users.repository';

export class MainMenu {
  menu: MenuTemplate<Context>;

  constructor(private readonly usersRepository: UsersRepository) {
    this.menu = new MenuTemplate<Context>(ctx => 'Главное меню:');
    this.init();
  }

  private init() {
    const actions = this.actions();
    this.menu.interact(actions.group.text, actions.group.identifier, {
      do: actions.group.execute,
    });
  }

  private actions() {
    return {
      group: new GetGroupsAction(this.usersRepository),
    };
  }
}
