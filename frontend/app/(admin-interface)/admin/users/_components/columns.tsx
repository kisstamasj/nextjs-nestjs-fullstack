"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
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
      return <DataTableColumnHeader column={column} title="Név" />
    },
  },
  {
    accessorKey: "email",
    id: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
];
