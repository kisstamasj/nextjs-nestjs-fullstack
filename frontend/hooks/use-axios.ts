import { axiosBackend } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo } from "react";

const useAxios = () => {
  const { data: session, status } = useSession();
  const controller = useMemo(() => new AbortController(), []);
  useEffect(() => {
    const requestIntercept = axiosBackend.interceptors.request.use((config) => {
      config.signal = controller.signal;
      if (status === "authenticated" && session) {
        config.headers.Authorization = `Bearer ${session?.user.backendTokens.accessToken}`;
      }

      return config;
    });

    return () => {
      axiosBackend.interceptors.request.eject(requestIntercept);
    };
  }, [session, status, controller]);

  return {axiosBackend, controller};
};

export default useAxios;
