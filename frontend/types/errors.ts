import { AxiosError, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios";

export interface RequestError extends AxiosError {
    response: {
      status: number;
      statusText: string;
      headers: AxiosResponseHeaders;
      config: InternalAxiosRequestConfig;
      data: {
        message: string;
      };
    };
  }