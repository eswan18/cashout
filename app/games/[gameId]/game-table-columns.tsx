"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ComputedEntry } from "@/types/types";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const gameTableColumns: ColumnDef<ComputedEntry>[] = [
  {
    accessorKey: "person",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Player
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className="px-4">{row.getValue("person")}</div>;
    }
  },
  {
    accessorKey: "buy_in",
    header: () => <div className="text-right">Buy-in</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("buy_in"))
      return <div className="text-right">{asCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "cash_out",
    header: () => <div className="text-right">Cash-out</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cash_out"))
      return <div className="text-right">{asCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "net",
    header: () => <div className="text-right">Net</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("net"))
      return <div className="text-right">{asCurrency(amount)}</div>;
    },
  },
]

function asCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}