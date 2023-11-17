"use client"

import axiosBase from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { data, status } = useSession();
  useEffect(() => {
    const requestIntercept = axiosBase.interceptors.request.use((config) => {
        if(status === 'authenticated'){
            config.headers.Authorization = `Bearer ${data.backendTokens.accessToken}`;
        }

        return config
    })

    return () => {
        axiosBase.interceptors.request.eject(requestIntercept)
    }
  }, [data, status]);

  return axiosBase;
};

export default useAxios;
