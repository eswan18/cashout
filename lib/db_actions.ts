'use server';

import { Entry, NewEntry } from '@/types/db_types';
import { db } from './database';

export async function getEntries(): Promise<Entry[]> {
  return await db.selectFrom('entries').selectAll().execute();
}

export async function getEntriesForGame({gameId}: {gameId: string}): Promise<Entry[]> {
  return await db.selectFrom('entries').where('game_id', '=', gameId).selectAll().execute();
}

export async function createEntry({entry}: {entry: NewEntry}): Promise<void> {
  await db.insertInto('entries').values(entry).execute();
}

export async function gameIdExists({gameId}: {gameId: string}): Promise<boolean> {
  return await db.selectFrom('entries').where('game_id', '=', gameId).executeTakeFirst() !== undefined;
}