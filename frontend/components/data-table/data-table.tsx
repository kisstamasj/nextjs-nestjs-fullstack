"use client";

import { Button } from "@/components/ui/button";
import {
  Table as TableComp,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef, Table, flexRender } from "@tanstack/react-table";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DataTablePagination } from "./pagination";
import { ColumnsIcon, PencilIcon, PlusCircleIcon } from "lucide-react";
import { Separator } from "../ui/separator";

interface DataTableProps<TData, TValue> {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
}

/**
 * Renders a DataTable component.
 */
export function DataTable<TData, TValue>({
  table,
  columns,
}: DataTableProps<TData, TValue>) {
  let initFilterValues: { [key: string]: string } = {};
  columns.forEach((col) => {
    if (col.id) initFilterValues[col.id] = "";
  });
  const [filterValues, setFilterValues] = useState<{ [key: string]: string }>(
    initFilterValues
  );

  /**
   * Handles the onChange event for the filter input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the onChange event.
   */
  const filterOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    table.getColumn(name)?.setFilterValue(value);
    setFilterValues({ ...filterValues, [name]: value });
  };

  return (
    <>
      <div className="flex justify-start items-center py-2 gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ColumnsIcon className="w-4 h-4 mr-2" />
              Oszlopok
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: any) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant={"outline"} className="ml-auto">
          <PlusCircleIcon className="w-4 h-4 mr-2" /> Létrehozás
        </Button>
        <Button variant={"outline"}>
          <PencilIcon className="w-4 h-4 mr-2" /> Módosítás
        </Button>
      </div>
      <div className="rounded-md border">
        <TableComp>
          <TableHeader className="dark:bg-slate-950 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const filterEnabled = header
                      .getContext()
                      .column.getCanFilter();
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
                            value={filterValues[header.id]}
                            onChange={filterOnChangeHandler}
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
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nincs megjeleníthető adat
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </TableComp>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
