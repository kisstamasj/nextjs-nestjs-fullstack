import { useCallback, useEffect, useState } from "react";
import useAxios from "./use-axios";
import { ColumnFiltersState } from "@tanstack/react-table";

interface IUseDataTableApi {
  api: string | undefined;
  params: {
    pagination: {
      skip: number;
      limit: number;
    };
    sort: {
      field: string;
      order: "ASC" | "DESC";
    };
    filter: ColumnFiltersState;
  };
}

interface DataTableApiResponse {
  data: [];
  count: number;
}

export const useDataTableApi = ({ api, params }: IUseDataTableApi) => {
  const { pagination, sort, filter } = params;
  const { skip, limit } = pagination;
  const { field, order } = sort;
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  if (!api) throw new Error("Api not provided");
  const fetchData = useCallback(async () => {
    setLoading(true);

    const { data } = await axios.get<DataTableApiResponse>(api, {
      params: {
        pagination: {
          skip,
          limit,
        },
        sort: {
          field,
          order,
        },
        filter,
      },
    });

    setData(data.data);
    setCount(data.count);
    setLoading(false);
  }, [api, field, order, skip, limit, axios, filter]);
  useEffect(() => {
    fetchData();
  }, [api, field, order, skip, limit, axios, filter, fetchData]);

  return { data, count, loading, fetchData };
};
