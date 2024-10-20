import GameTable from "./game-table";
import { gameTableColumns } from "./game-table-columns";
import { getEntriesForGame } from "@/lib/db_actions";

export default async function Page({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId.toLowerCase();
  const entries = await getEntriesForGame({ gameId });
  const computedEntries = entries.map((entry) => ({
    ...entry,
    net: entry.cash_out - entry.buy_in,
  }));
  return (
    <div className="flex flex-col items-center justify-start p-4 lg:py-8 w-full">
      <h1 className="text-2xl mb-8">
        Game{" "}
        <span className="font-semibold">
          <code>{gameId}</code>
        </span>
      </h1>
      <GameTable columns={gameTableColumns} data={computedEntries} gameId={gameId} />
    </div>
  );
}
