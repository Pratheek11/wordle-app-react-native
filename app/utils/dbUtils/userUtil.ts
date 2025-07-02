import { getDBConnection } from '@/app/db/connection';
import { createCoinsTable } from '@/app/db/schema/coinsSchema';
import { createUserTables } from '@/app/db/schema/userSchema';
import { UserState } from '@/app/redux/slices/userSlice';
import * as SQLite from 'expo-sqlite';

let db : SQLite.SQLiteDatabase;

export const initUser = async () => {
    db = await getDBConnection();
    await createUserTables(db);
    await createCoinsTable(db);
}

export const storeCoinValue = (userData: UserState, coins: number) => {
    deleteCoinsRow();

    const insertQuery = `
    INSERT INTO coins (name, username, coins) 
    VALUES (?, ?, ?)`;
    
    db.runSync(insertQuery, [
        userData.name,
        userData.username,
        coins
    ]);
}

export const insertUser = async (userData: UserState) => {
    await deleteAllUsers();

    const insertQuery = `
    INSERT INTO users (name, username, age, gender) 
    VALUES (?, ?, ?, ?)`;

    await db.runAsync(insertQuery, [
        userData.name,
        userData.username,
        userData.age,
        userData.gender,
    ]);
}

export const getUserDetails = async (): Promise<UserState | null> => {
  const results: UserState[] | null = await db.getAllAsync('SELECT * FROM users');
  return results[0] ?? null;
};

export const getCoins = async (): Promise<number | null> => {
  const results: {coins: number}[] | null = await db.getAllAsync<{coins: number}>('SELECT coins FROM coins');
  return results[0]?.coins ?? null;
};

const deleteAllUsers = async () => {
    await db.runAsync('DELETE FROM users');
};

const deleteCoinsRow = () => {
    db.runSync('DELETE FROM coins');
};