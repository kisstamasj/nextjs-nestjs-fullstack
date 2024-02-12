"use client";

import { createAxiosBase } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { data: session, status } = useSession();
  const axios = createAxiosBase();
  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(async (config) => {
      if (status === "authenticated" && session) {
        config.headers.Authorization = `Bearer ${session?.user.backendTokens.accessToken}`;
      }

      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestIntercept);
    };
  }, [session, status, axios]);

  return axios;
};

export default useAxios;
