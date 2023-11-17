import axios from "axios";
import { BACKEND_URL } from "./constants";

/**
 * Creates an instance of the Axios HTTP client with a base URL and default headers.
 * @returns {AxiosInstance} - An instance of the Axios HTTP client.
 */
export const createAxios = () => {
  return axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosBase = createAxios();

export default axiosBase;
