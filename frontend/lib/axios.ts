import { Session } from "next-auth/types";
import axios from "axios";
import { getBackendUrl } from "./utils";

interface CreateAxiosServerSideProps {
  withCredentials: boolean;
  token?: string;
}

export const axiosBackend = axios.create({
  baseURL: getBackendUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Creates an Axios instance for server-side requests.
 *
 * @param {CreateAxiosServerSideProps} props - The props for the createAxiosServerSide function.
 * The token property is optional and only used when withCredentials is true.
 * Useful when you don't want to get the token (accessToken or refreshToken) from the session.
 * If the withCredentials property is true, and the token is not provided, it will try to get the accessToken from the session.
 *
 */
export const createAxiosServerSide = async ({
  withCredentials,
  token,
}: CreateAxiosServerSideProps) => {
  let session: Session | null;
  if (withCredentials) {
    if (!token) {
      const { auth } = await import("@/auth");
      session = await auth();
      const user = session?.user;
      axiosBackend.interceptors.request.use((config) => {
        if (session) {
          config.headers.Authorization = `Bearer ${user?.backendTokens.accessToken}`;
        }

        return config;
      });

      return axiosBackend;
    }

    axiosBackend.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  }

  return axiosBackend;
};
