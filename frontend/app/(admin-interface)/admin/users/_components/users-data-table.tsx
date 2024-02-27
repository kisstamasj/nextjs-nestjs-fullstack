"use client";

import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns } from "./columns";
import { DataTableProvider } from "@/contexts/datatable-context";
import DataTableControls from "@/components/data-table/controls";
import { DataTablePagination } from "@/components/data-table/pagination";

export function UsersDataTable() {
  return (
    <div className="mx-auto py-3 w-full">
      <DataTableProvider
        columns={columns}
        visibilityState={{
          id: false,
          name: true,
          email: true,
          createdAt: false,
          updatedAt: false,
        }}
        sortingState={{
          field: "name",
          order: "ASC",
        }}
        pageRoute="/admin/users"
        api="/users"
      >
        <DataTableControls />
        <DataTable />
        <DataTablePagination />
      </DataTableProvider>
    </div>
  );
}
