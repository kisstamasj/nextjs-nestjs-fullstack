import { Session } from "next-auth/types";
import axios, { AxiosInstance } from "axios";
import { BACKEND_URL } from "./constants";

interface CreateAxiosServerSideProps {
  withCredentials: boolean;
  accessToken?: string;
}

const createAxiosBase = (): AxiosInstance => {
  return axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const axiosBase = createAxiosBase();

/**
 * Creates an Axios instance for server-side requests.
 *
 * @param {CreateAxiosServerSideProps} props - The props for the createAxiosServerSide function.
 * The accessToken property is optional and only used when withCredentials is true.
 * Useful when you don't want to get the accesToken from the session.
 * If the withCredentials property is true, and the accessToken is not provided, it will try to get the accessToken from the session.
 * 
 * @returns {AxiosInstance} The Axios instance for server-side requests.
 */
export const createAxiosServerSide = async ({
  withCredentials,
  accessToken,
}: CreateAxiosServerSideProps) => {
  let session: Session | null;
  if (withCredentials) {
    if (!accessToken) {
      const { auth } = await import("@/auth");
      session = await auth();
      const user = session?.user;
      axiosBase.interceptors.request.use((config) => {
        if (session) {
          config.headers.Authorization = `Bearer ${user?.backendTokens.accessToken}`;
        }

        return config;
      });

      return axiosBase;
    }

    axiosBase.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }

  return axiosBase;
};
