import {Repository} from './repository';
import {Database} from 'sqlite';
import * as sqlite3 from 'sqlite3';
import {UserEntity} from '../../entities/user.entity';

export class UsersRepository implements Repository {
  constructor(
    readonly database: Database<sqlite3.Database, sqlite3.Statement>
  ) {}

  async get(telegramId: number) {
    const user = await this.database.get<UserEntity>(
      'SELECT * FROM users WHERE telegramId=?',
      [telegramId]
    );

    return user;
  }

  async add(telegramId: number) {
    const result = await this.database.run(
      'INSERT INTO users(telegramId) VALUES ($telegramId)',
      {$telegramId: telegramId}
    );

    return result.changes;
  }
}
