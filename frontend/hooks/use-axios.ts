"use client";

import { axiosBase } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    const requestIntercept = axiosBase.interceptors.request.use(async (config) => {
      if (status === "authenticated" && session) {
        config.headers.Authorization = `Bearer ${session?.user.backendTokens.accessToken}`;
      }

      return config;
    });

    return () => {
      axiosBase.interceptors.request.eject(requestIntercept);
    };
  }, [session, status]);

  return axiosBase;
};

export default useAxios;
