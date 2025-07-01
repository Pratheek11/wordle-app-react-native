import * as SQLite from 'expo-sqlite';

export const createCoinsTable = async (db: SQLite.SQLiteDatabase) => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS coins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      coins Integer
    );`;
    db.execSync(userTable);
};