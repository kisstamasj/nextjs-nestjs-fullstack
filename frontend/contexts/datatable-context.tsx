import { useDataTableApi } from "@/hooks/data-table/use-data-table-api";
import { useFiltering } from "@/hooks/data-table/use-filtering";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePagination } from "@/hooks/data-table/use-pagination";
import { useSorting } from "@/hooks/data-table/use-sorting";
import { RequestErrorMessage } from "@/types/errors";
import {
  ColumnDef,
  Table,
  TableState,
  VisibilityState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash.debounce";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface SortingState {
  field: string;
  order: "ASC" | "DESC";
}

export interface IDataTableContext {
  table: Table<any>;
  loading: boolean;
  count: number;
  pageRoute: string;
  sortingState: SortingState;
  visibilityState: VisibilityState;
  api: string;
  columns: ColumnDef<any, any>[];
  filterOnChangeHandler: (target: { name: string; value: string }) => void;
  fetchData: () => void;
  resetTable: () => void;
  error: RequestErrorMessage | undefined;
}

interface IDataTableProvider<TData, TValue> {
  children: React.ReactNode;
  sortingState: SortingState;
  visibilityState: VisibilityState;
  columns: ColumnDef<TData, TValue>[];
  api: string;
  pageRoute: string;
}

const LOCAL_STORAGE_PREFIX = "tableState";

export const DataTableContext = createContext<IDataTableContext | undefined>(
  undefined
);

/**
 * Returns the data table context.
 *
 * @return {IDataTableContext} The data table context
 */
export const useDataTable = (): IDataTableContext => {
  const context = useContext(DataTableContext);
  if (!context) {
    throw new Error("Please use DataTableProvider in parent component");
  }
  return context;
};

/**
 * DataTableProvider function to provide a data table context for the children components.
 *
 * @param {IDataTableProvider} - children, backendApi, table
 */
export function DataTableProvider<TData, TValue>({
  children,
  sortingState,
  visibilityState,
  columns,
  api,
  pageRoute,
}: IDataTableProvider<TData, TValue>) {
  if (!columns) throw new Error("Columns not provided");

  const { getItem, setItem } = useLocalStorage<Partial<TableState>>();
  const localState = getItem(`${LOCAL_STORAGE_PREFIX}:${pageRoute}`);
  if (localState && localState.sorting) {
    sortingState.field = localState.sorting[0].id;
    sortingState.order = localState.sorting[0].desc ? "DESC" : "ASC";
  }

  const defaultVisibilityState = visibilityState;

  if (localState && localState.columnVisibility)
    visibilityState = localState.columnVisibility;

  const { limit, onPaginationChange, skip, pagination } = usePagination();
  const { field, onSortingChange, order, sorting } = useSorting(
    sortingState.field,
    sortingState.order
  );

  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>(visibilityState);

  const { columnFilters, filterValues, setFilterValues, setColumnFilters } =
    useFiltering(columns);

  const { count, data, loading, fetchData, error } = useDataTableApi({
    api,
    params: {
      pagination: { skip, limit },
      sort: {
        field,
        order,
      },
      filter: columnFilters,
    },
  });

  const pageCount = useMemo(() => Math.ceil(count / limit), [count, limit]);
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data ?? [], [data]);

  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      pagination,
      sorting,
      columnVisibility,
      columnFilters,
    },
    pageCount,
  });

  useEffect(() => {
    setItem(`${LOCAL_STORAGE_PREFIX}:${pageRoute}`, table.getState());
  }, [pageRoute, sorting, columnVisibility, setItem, table]);

  /**
   * Handles the onChange event for the filter input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the onChange event.
   */
  const filterOnChangeHandler = debounce(
    (target: { name: string; value: string }) => {
      const { name, value } = target;
      table.getColumn(name)?.setFilterValue(value);
      setFilterValues({ ...filterValues, [name]: value });
    },
    500
  );

  const resetTable = () => {
    table.setColumnVisibility(defaultVisibilityState);
    table.setColumnFilters([]);
    table.resetRowSelection();
    fetchData();
  };

  const value = {
    columns,
    table,
    loading,
    count,
    filterOnChangeHandler,
    sortingState,
    visibilityState,
    pageRoute,
    api,
    fetchData,
    resetTable,
    error,
  };
  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
}
