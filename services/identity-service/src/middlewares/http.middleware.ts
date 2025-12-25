// utils/http.ts
import { ApiError } from "@/types/error";
import axios, { AxiosRequestConfig } from "axios";

export const http = async (config: AxiosRequestConfig) => {
    try {
        return await axios(config);
    } catch (err: any) {

        const status = (err as any).response?.status || 500;
        const data = (err as any).response?.data || null;
        const message = status === 404 ? "آدرس مورد نظر یافت نشد" : (err as any).response?.data?.message || "Service Error";


        throw new ApiError(
            message,
            status,
            data
        )
    }
};
