import {
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  entries: EntriesTable,
}

export interface EntriesTable {
  id: Generated<number>,
  game_id: string,
  person: string,
  buy_in: number,
  cash_out: number,
}
export type Entry = Selectable<EntriesTable>
export type NewEntry = Insertable<EntriesTable>
export type EntryUpdate = Updateable<EntriesTable>