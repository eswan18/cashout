'use server';

import { Entry } from '@/types/db_types';
import { db } from './database';

export async function getEntries(): Promise<Entry[]> {
  return await db.selectFrom('entries').selectAll().execute();
}