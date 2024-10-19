"use client";

import { Entry } from "@/types/db_types";

export default function GameTable({ entries }: { entries: Entry[] }) {
  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.id}>
          <span>{entry.game_id}</span>
          <span>{entry.person}</span>
          <span>{entry.buy_in}</span>
          <span>{entry.cash_out}</span>
        </li>
      ))}
    </ul>
  );
}
