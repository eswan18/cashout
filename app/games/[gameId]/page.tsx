import { CircleCheckBig, X } from "lucide-react";
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
  const balance = computedEntries.reduce(
    (acc, entry) => acc + Number(entry.net),
    0,
  );
  return (
    <div className="flex flex-col items-center justify-start p-4 lg:py-8 w-full">
      <h1 className="text-2xl mb-8">
        Game{" "}
        <span className="font-semibold">
          <code>{gameId}</code>
        </span>
      </h1>
      <GameTable
        columns={gameTableColumns}
        data={computedEntries}
        gameId={gameId}
      />
      <div className="mt-8">
        <BalanceStatus balance={balance} />
      </div>
    </div>
  );
}

function BalanceStatus({ balance }: { balance: number }) {
  const icon = balance === 0
    ? <CircleCheckBig size={32} className="text-green-400" />
    : <X size={32} className="text-red-600" />;
  const balanceText = balance === 0
    ? <span className="text-green-400 font-semibold text-lg">Balanced</span>
    : <span className="text-red-600 font-semibold text-lg">Unbalanced</span>;
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      Settlement status
      <div className="flex flex-row justify-center items-center gap-3">
        {balanceText} {icon}
      </div>
    </div>
  );
}
