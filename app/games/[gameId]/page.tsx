import { CircleCheckBig, X } from "lucide-react";
import { LedgerTable, ledgerTableColumns } from "./ledger-table";
import { getEntriesForGame } from "@/lib/db_actions";
import SettleUpCard from "./settle-up-card";

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

      <LedgerHeading balance={balance} />
      <LedgerTable
        columns={ledgerTableColumns}
        data={computedEntries}
        gameId={gameId}
      />
      {balance === 0 && (
        <div className="mt-8">
          <SettleUpCard computedEntries={computedEntries} />
        </div>
      )}
    </div>
  );
}

function LedgerHeading({ balance }: { balance: number }) {
  const icon = balance === 0
    ? <CircleCheckBig size={32} className="text-green-400" />
    : <X size={32} className="text-red-600" />;
  const balanceText = balance === 0
    ? <span className="text-green-400 font-semibold text-lg">Balanced</span>
    : <span className="text-red-600 font-semibold text-lg">Unbalanced</span>;
  return (
    <div className="flex flex-row justify-center items-center gap-3 mb-4">
      <h2 className="text-lg flex flex-row items-end justify-start gap-4">
        <span>Ledger:</span> {balanceText}
      </h2>
      {icon}
    </div>
  );
}
