import { AxiosError, AxiosResponseHeaders, InternalAxiosRequestConfig } from "axios";

export interface RequestError extends AxiosError {
    response: {
      status: number;
      statusText: string;
      headers: AxiosResponseHeaders;
      config: InternalAxiosRequestConfig;
      data: {
        statusCode: number;
        message: RequestErrorMessage;
      };
    };
  }

  export type RequestErrorMessage = string | {property: string; message: string}[];
  