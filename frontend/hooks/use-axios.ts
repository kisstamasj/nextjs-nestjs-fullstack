import { axiosBackend } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxios = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    const requestIntercept = axiosBackend.interceptors.request.use((config) => {
      if (status === "authenticated" && session) {
        config.headers.Authorization = `Bearer ${session?.user.backendTokens.accessToken}`;
      }

      return config;
    });

    return () => {
      axiosBackend.interceptors.request.eject(requestIntercept);
    };
  }, [session, status]);

  return axiosBackend;
};

export default useAxios;
