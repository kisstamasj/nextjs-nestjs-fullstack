"use client"


import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataTable } from "@/contexts/datatable-context";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface DataTablePaginationProps {
}

/**
 * Renders the pagination component for the data table.
 */
export function DataTablePagination({}: DataTablePaginationProps) {
  const {table, loading, count} = useDataTable()
  return (
    <div className="flex items-center justify-center md:justify-between px-1 py-3 w-full">
      <div className="flex-1 text-sm text-muted-foreground hidden md:block">
        {table.getFilteredSelectedRowModel().rows.length} sor{" "}
        {count} sorból kiválasztva
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium hidden md:block text-nowrap">
            Sorok oldalanként
          </p>
          <Select
            disabled={loading}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}{" "}
          oldal
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <span className="sr-only">Első oldalra</span>
            <ChevronFirst className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage() || loading}
          >
            <span className="sr-only">Előző oldal</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage() || loading}
          >
            <span className="sr-only">Következő oldal</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden h-8 w-8 p-0 md:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage() || loading}
          >
            <span className="sr-only">Utolsó oldal</span>
            <ChevronLast className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
