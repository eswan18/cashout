"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComputedEntry } from "@/types/types";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteEntry } from "@/lib/db_actions";

export const gameTableColumns: ColumnDef<ComputedEntry>[] = [
  {
    accessorKey: "person",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 text-xs md:text-sm"
        >
          Player
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-xs md:text-sm">{row.getValue("person")}</div>;
    },
  },
  {
    accessorKey: "buy_in",
    header: () => <div className="text-right text-xs md:text-sm">Buy-in</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("buy_in"));
      return <div className="text-right text-muted-foreground">{asCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "cash_out",
    header: () => <div className="text-right text-xs md:text-sm">Cash-out</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cash_out"));
      return <div className="text-right text-muted-foreground">{asCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "net",
    header: () => <div className="text-right text-xs md:text-sm">Net</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("net"));
      return <div className="text-right">{asCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "id",
    header: () => <div className="text-right text-xs md:text-sm">Delete</div>,
    cell: ({ row }) => {
      return (
        <Button
          size="icon"
          variant="ghost"
          className="text-destructive"
          onClick={() => deleteEntry({ entryId: row.getValue("id") })}
        >
          <Trash />
        </Button>
      );
    },
  },
];

export function asCurrency(amount: number) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
  // Be sure to add a plus sign for positive amounts.
  return formatted.startsWith("-") ? formatted : `+${formatted}`;
}
