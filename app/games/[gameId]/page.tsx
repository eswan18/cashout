import GameTable from "./game-table";
import { getEntriesForGame } from "@/lib/db_actions";

export default async function Page({ params }: { params: { gameId: string } }) {
  const gameId = params.gameId.toLowerCase();
  const entries = await getEntriesForGame({ gameId });
  return (
    <div className="flex flex-col items-center justify-start p-4 w-full">
      <h1 className="text-2xl">
        Game{" "}
        <span className="font-semibold">
          <code>{gameId}</code>
        </span>
      </h1>
      <GameTable entries={entries} />
    </div>
  );
}
