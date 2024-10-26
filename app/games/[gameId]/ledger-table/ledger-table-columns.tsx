"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ComputedEntry } from "@/types/types";
import { ArrowUpDown, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteEntry } from "@/lib/db_actions";
import { asCurrency } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export const ledgerTableColumns: ColumnDef<ComputedEntry>[] = [
  {
    accessorKey: "person",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-xs md:text-sm"
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
    header: () => (
      <div className="text-right text-xs md:text-sm px-2">Buy-in</div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("buy_in"));
      return (
        <div className="text-right text-xs text-muted-foreground">
          {asCurrency(amount, false)}
        </div>
      );
    },
  },
  {
    accessorKey: "cash_out",
    header: () => (
      <div className="text-right text-xs md:text-sm px-2">Cash-out</div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cash_out"));
      return (
        <div className="text-right text-xs text-muted-foreground">
          {asCurrency(amount, false)}
        </div>
      );
    },
  },
  {
    accessorKey: "net",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-xs md:text-sm"
        >
          Net
          <ArrowUpDown className="ml-1 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("net"));
      const color = amount >= 0 ? "bg-green-300" : "bg-red-300";
      return (
        <div className="flex flex-row justify-center">
          <Badge variant="outline" className={color}>
            {asCurrency(amount, true)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: () => <div />,
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
