"use client";

import axiosBase from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { status, update } = useSession();
  useEffect(() => {
    const requestIntercept = axiosBase.interceptors.request.use(async (config) => {
      let session = await update();
      if (status === "authenticated" && session) {
        config.headers.Authorization = `Bearer ${session?.backendTokens.accessToken}`;
      }

      return config;
    });

    return () => {
      axiosBase.interceptors.request.eject(requestIntercept);
    };
  }, [status, update]);

  return axiosBase;
};

export default useAxios;
