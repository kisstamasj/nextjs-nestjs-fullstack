import { RequestError } from "@/types/errors";
import axios from "axios";
import { Session } from "next-auth";
import { notFound } from "next/navigation";
import { getBackendUrl } from "./utils";

export const axiosBackend = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Create an Axios server side with optional token support.
 *
 * @param withToken - (default = true) flag indicating whether to use a token in the request header
 * @param token - optional token to use for authorization. 
 * If there is no given token, and the withToken is true, then it will be fetch from the session.
 */
export const createAxiosServerSide = async (withToken = true, token = null) => {
  let session: Session | null;
  const controller = new AbortController();
  if (withToken) {
    if (!token) {
      const { auth } = await import("@/lib/auth");
      session = await auth();
      const user = session?.user;
      axiosBackend.interceptors.request.use((config) => {
        config.signal = controller.signal;
        if (session) {
          config.headers.Authorization = `Bearer ${user?.backendTokens.accessToken}`;
        }

        return config;
      });

      return { axiosBackend, controller };
    }

    axiosBackend.interceptors.request.use((config) => {
      config.signal = controller.signal;
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  return { axiosBackend, controller };
};

/**
 * Asynchronously fetches data from the server-side.
 *
 * @param {string} url - The URL to fetch data from
 */
export const fetchDataServerSide = async (url: string) => {
  try {
    const { axiosBackend: axios } = await createAxiosServerSide();
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    let e = error as RequestError;
    if (e.response?.data?.statusCode === 404) {
      notFound();
    } else {
      throw e;
    }
  }
};
