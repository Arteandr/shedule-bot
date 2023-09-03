import {Database} from 'sqlite';
import * as sqlite3 from 'sqlite3';

export class Sheduler {
  constructor(
    private readonly database: Database<sqlite3.Database, sqlite3.Statement>
  ) {}
}
