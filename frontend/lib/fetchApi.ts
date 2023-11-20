import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { BACKEND_URL } from "./constants";

const fetchApi = async (
  url: RequestInfo,
  method?: RequestInit["method"],
  headers?: HeadersInit,
  cache?: RequestCache
) => {
  const session = await getServerSession(options);
  const defaultHeaders = {
    authorization: `Bearer ${session?.backendTokens.accessToken}`,
    "Content-Type": "application/json",
  };
  const response = await fetch(BACKEND_URL! + url, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    cache
  });

  return await response.json()
};

export default fetchApi;
