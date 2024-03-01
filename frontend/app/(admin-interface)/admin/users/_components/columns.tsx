"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef, RowData } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<User, any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    id: "id",
    header: "ID",
    meta: {
      label: "ID",
    },
  },
  {
    accessorKey: "name",
    id: "name",
    meta: {
      label: "Név",
    },
    header: ({ column }) => {
      const label = column.columnDef.meta ? column.columnDef.meta.label : "Név";
      return (
        <DataTableColumnHeader
          column={column}
          title={label}
        />
      );
    },
  },
  {
    accessorKey: "email",
    id: "email",
    meta: {
      label: "Email",
    },
    header: ({ column }) => {
      const label = column.columnDef.meta ? column.columnDef.meta.label : "Email";
      return <DataTableColumnHeader column={column} title={label} />;
    },
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    meta: {
      label: "Létrehozás",
    },
    header: ({ column }) => {
      const label = column.columnDef.meta ? column.columnDef.meta.label : "Létrehozás";
      return <DataTableColumnHeader column={column} title={label} />;
    },
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.createdAt).toLocaleString("hu", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    id: "updatedAt",
    meta: {
      label: "Módosítás",
    },
    header: ({ column }) => {
      const label = column.columnDef.meta ? column.columnDef.meta.label : "Módosítás";
      return <DataTableColumnHeader column={column} title={label} />;
    },
    cell: ({ row }) => {
      return (
        <div>
          {new Date(row.original.updatedAt).toLocaleString("hu", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
];
