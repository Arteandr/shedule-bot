import {Database, open} from 'sqlite';
import {getEnv} from '../utils';
import * as sqlite3 from 'sqlite3';
import * as path from 'path';

export const openDB = () => {
  return open({
    filename: `./${getEnv('DB_NAME')}.db`,
    driver: sqlite3.cached.Database,
  });
};

export const migrate = (
  database: Database<sqlite3.Database, sqlite3.Statement>
) => {
  return database.migrate({
    force: false,
    migrationsPath: path.join(process.cwd(), 'migrations'),
  });
};
