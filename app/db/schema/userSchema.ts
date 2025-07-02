import * as SQLite from 'expo-sqlite';

export const createUserTables = async (db: SQLite.SQLiteDatabase) => {
  const userTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      username TEXT NOT NULL,
      age INTEGER,
      gender TEXT
    );`;
    db.execSync(userTable);
};