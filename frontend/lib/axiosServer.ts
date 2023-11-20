import options from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import axiosBase from "./axios"

export const axiosServer = async () => {
    const session = await getServerSession(options)
    axiosBase.interceptors.request.use((config) => {
        if(session){
            config.headers.Authorization = `Bearer ${session.backendTokens.accessToken}`;
        }

        return config;
    })

    return axiosBase;
}