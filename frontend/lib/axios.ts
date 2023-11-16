import options from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

const IS_SERVER = typeof window === "undefined";
const BASE_URL = IS_SERVER
  ? process.env.NEXT_INTERNAL_API_URL
  : process.env.NEXT_PUBLIC_API_URL;

/**
 * Creates an instance of the Axios HTTP client with a base URL and default headers.
 * @returns {AxiosInstance} - An instance of the Axios HTTP client.
 */
export const createAxios = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosClient = createAxios();

axiosClient.interceptors.request.use(async (config) => {
  let token = '';
  if (IS_SERVER) {
    const session = await getServerSession(options);
    token = `Bearer ${session?.backendTokens.accessToken}`;
  } else {
    const { data } = useSession();
    token = `Bearer ${data?.backendTokens.accessToken}`;
  }

  config.headers.Authorization = token;

  return config;
})

export default axiosClient;
