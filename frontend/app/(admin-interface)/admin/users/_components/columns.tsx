"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

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
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Név" />;
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
  },
  {
    accessorKey: "createdAt",
    id: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Létrehozás" />;
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
      return <DataTableColumnHeader column={column} title="Módosítás" />;
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
