"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createEntry } from "@/lib/db_actions";
import RecordEntryButton from "./record-entry-button";
import { ComputedEntry } from "@/types/types";
import { asCurrency } from "@/lib/format";

interface LedgerTableProps {
  columns: ColumnDef<ComputedEntry>[];
  data: ComputedEntry[];
  gameId: string;
}

export default function LedgerTable({
  columns,
  data,
  gameId,
}: LedgerTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });
  const totals = {
    buy_in: data.reduce((acc, entry) => acc + Number(entry.buy_in), 0),
    cash_out: data.reduce((acc, entry) => acc + Number(entry.cash_out), 0),
    net: data.reduce((acc, entry) => acc + Number(entry.net), 0),
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="px-0">
                    {header.isPlaceholder ? null : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-1 px-3">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext(),
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
          {/* A row with a Record New Entry button */}
          <TableRow>
            <TableCell colSpan={columns.length} className="h-12 text-center">
              <RecordEntryButton
                recordEntry={(entry) => {
                  createEntry({ entry: { ...entry, game_id: gameId } });
                }}
              />
            </TableCell>
          </TableRow>
          {/* Totals row */}
          <TableRow>
            <TableCell>
              <div className="px-4 font-semibold">Total</div>
            </TableCell>
            <TableCell>
              <div className="text-right text-muted-foreground">{asCurrency(totals.buy_in)}</div>
            </TableCell>
            <TableCell>
              <div className="text-right text-muted-foreground">{asCurrency(totals.cash_out)}</div>
            </TableCell>
            <TableCell>
              <div className="text-right font-semibold">{asCurrency(totals.net)}</div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
