import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { asCurrency } from "@/lib/format";
import { ComputedEntry } from "@/types/types";
import { MoveRight } from "lucide-react";

export default function SettleUpCard(
  { computedEntries }: { computedEntries: ComputedEntry[] },
) {
  const payments = simplifyPayments(computedEntries);
  // Alphabetize the payments for consistency.
  payments.sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to));
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-xl">Settle Up</CardTitle>
      </CardHeader>
      <CardContent>
        {payments.map((payment) => {
          return (
            <div
              key={payment.from + payment.to}
              className="flex flex-row justify-between items-center gap-6 border-b first:border-t px-1"
            >
              <div className="flex flex-row items-center gap-2 py-1 text-sm">
                <span>{payment.from}</span>
                <MoveRight size={20} className="text-muted-foreground" />
                <span>{payment.to}</span>
              </div>
              <div>{asCurrency(payment.amount)}</div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

type Payment = {
  from: string;
  to: string;
  amount: number;
};

function simplifyPayments(computedEntries: ComputedEntry[]): Payment[] {
  // Consolidate the various debts into fewer transactions.
  const debtors = computedEntries.filter((entry) => entry.net < 0);
  const creditors = computedEntries.filter((entry) => entry.net > 0);
  const payments: Payment[] = [];
  while (creditors.length > 0) {
    if (debtors.length <= 0) {
      throw Error("debts and credits don't match up: leftover creditors");
    }
    // First check if any debt and credit are equal.
    // If so, we can resolve them both in a single transaction.
    let perfect_match = false;
    for (const c_idx in creditors) {
      for (const d_idx in debtors) {
        const creditor = creditors[Number(c_idx)];
        const debtor = debtors[Number(d_idx)];
        if (creditor.net == -debtor.net) {
          // If we find a match:
          //   1. Record a payment from debtor to creditor.
          //   2. Remove both the creditor and debtor so we don't reprocess them.
          payments.push({
            from: debtor.person,
            to: creditor.person,
            amount: creditor.net,
          });
          creditors.splice(Number(c_idx), 1);
          debtors.splice(Number(d_idx), 1);
          perfect_match = true;
          break;
        }
      }
      if (perfect_match) break;
    }
    if (perfect_match) continue;

    // From here on out, we just do our best to simplify the transactions.
    // We just pick the largest debtor and have them pay the largest creditor.
    const biggestDebtor = debtors.reduce((acc, entry) =>
      entry.net < acc.net ? entry : acc
    );
    const biggestCreditor = creditors.reduce((acc, entry) =>
      entry.net > acc.net ? entry : acc
    );
    const amount = Math.min(-biggestDebtor.net, biggestCreditor.net);
    payments.push({
      from: biggestDebtor.person,
      to: biggestCreditor.person,
      amount,
    });
    biggestDebtor.net = toTwoDecimals(biggestDebtor.net + amount);
    if (biggestDebtor.net === 0) {
      debtors.splice(debtors.indexOf(biggestDebtor), 1);
    }
    biggestCreditor.net = toTwoDecimals(biggestCreditor.net - amount);
    if (biggestCreditor.net === 0) {
      creditors.splice(creditors.indexOf(biggestCreditor), 1);
    }
  }
  if (debtors.length > 0) {
    throw Error("debts and credits don't match up: leftover debtors");
  }
  return payments;
}

function toTwoDecimals(num: number) {
  return Math.round(num * 100) / 100;
}
