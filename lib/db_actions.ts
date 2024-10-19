'use server';

import { Entry } from '@/types/db_types';
import { db } from './database';

export async function getEntries(): Promise<Entry[]> {
  return await db.selectFrom('entries').selectAll().execute();
}

export async function getEntriesForGame({gameId}: {gameId: string}): Promise<Entry[]> {
  return await db.selectFrom('entries').where('game_id', '=', gameId).selectAll().execute();
}

export async function gameIdExists({gameId}: {gameId: string}): Promise<boolean> {
  return await db.selectFrom('entries').where('game_id', '=', gameId).executeTakeFirst() !== undefined;
}