import { RequestError, RequestErrorMessage } from "@/types/errors";
import { useEffect, useState, useTransition } from "react";
import useAxios from "./use-axios";

export function useFetcher<T>(url: string) {
  const { axiosBackend: axios } = useAxios();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<T>({} as T);
  const [error, setError] = useState<RequestErrorMessage | null>(null);

  useEffect(() => {
    const fetchData = async (url: string) => {
      startTransition(async () => {
        try {
          const { data } = await axios.get(url);
          setData(data);
          setError(null);
        } catch (error) {
          let e = error as RequestError;
          setError(e.response?.data?.message);
        }
      });
    };
    fetchData(url);
  }, [url, axios]);

  return { data, error, isPending };
}
