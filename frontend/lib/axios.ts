import axios from "axios";

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

export default axiosClient;
