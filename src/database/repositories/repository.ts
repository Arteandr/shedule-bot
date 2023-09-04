import {Database} from 'sqlite';
import * as sqlite3 from 'sqlite3';
import {UsersRepository} from './users.repository';

export interface Repository {
  database: Database<sqlite3.Database, sqlite3.Statement>;
}

export class Repositories {
  constructor(
    private readonly database: Database<sqlite3.Database, sqlite3.Statement>
  ) {}

  init() {
    return {
      users: new UsersRepository(this.database),
    };
  }
}
