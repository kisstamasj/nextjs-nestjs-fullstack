"use client";

import {
  Table as TableComp,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import React from "react";
import { Input } from "../ui/input";
import { Loader } from "../loader";
import { useDataTable } from "@/contexts/datatable-context";


/**
 * Renders a DataTable component.
 */
export function DataTable() {
  const { columns, loading, table, filterOnChangeHandler } = useDataTable();

  return (
    <>
      <div className="rounded-md border">
        <TableComp>
          <TableHeaderComp
            table={table}
            filterOnChangeHandler={filterOnChangeHandler}
          />
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={100}>
                  <div className="h-56 flex items-center justify-center">
                    <Loader />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBodyComp table={table} columns={columns} />
          )}
        </TableComp>
      </div>
    </>
  );
}

interface TableHeaderProps<TData> {
  table: Table<TData>;
  filterOnChangeHandler: (target: { name: string; value: string }) => void;
}

function TableHeaderComp<TData>({
  table,
  filterOnChangeHandler,
}: TableHeaderProps<TData>) {
  return (
    <TableHeader className="dark:bg-slate-950 bg-gray-100">
      {table.getHeaderGroups().map((headerGroup) => {
        return (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const filterEnabled = header.getContext().column.getCanFilter();
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {filterEnabled && (
                    <Input
                      className="text-xs mt-1 mb-2 h-7"
                      key={header.id + "filter"}
                      placeholder={"Keresés..."}
                      onChange={(e) => filterOnChangeHandler(e.target)}
                      name={header.id}
                    />
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        );
      })}
    </TableHeader>
  );
}

interface TableBodyCompProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
}

function TableBodyComp<TData, TValue>({
  table,
  columns,
}: TableBodyCompProps<TData, TValue>) {
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            Nincs megjeleníthető adat
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
