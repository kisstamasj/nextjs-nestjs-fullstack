import { RequestError, RequestErrorMessage } from "@/types/errors";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import useAxios from "../use-axios";

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
  const [error, setError] = useState<RequestErrorMessage>();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  if (!api) throw new Error("Api not provided");
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
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
    } catch (error) {
      let e = error as RequestError;
      console.error(error);
      setError(e.response?.data?.message);
      setData([]);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, [api, field, order, skip, limit, axios, filter]);
  useEffect(() => {
    fetchData();
  }, [api, field, order, skip, limit, axios, filter, fetchData]);

  return { data, count, loading, fetchData, error };
};
