import { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useState } from "react";

export function useFiltering<TData, TValue>(columns: ColumnDef<TData, TValue>[]) {
  let initFilterValues: { [key: string]: string } = {};
  columns?.forEach((col) => {
    if (col.id) initFilterValues[col.id] = "";
  });
  
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterValues, setFilterValues] = useState(initFilterValues);

  return {
    columnFilters,
    setColumnFilters,
    filterValues,
    setFilterValues
  };
}