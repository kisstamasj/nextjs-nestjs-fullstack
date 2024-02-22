export interface DataTableQueryParam {
  pagination: {
    skip: number;
    limit: number;
  };
  sort: {
    field: string;
    order: 'ASC' | 'DESC';
  };
  filter: ColumnFilter[];
}

export interface ColumnFilter {
  id: string;
  value: string;
}
