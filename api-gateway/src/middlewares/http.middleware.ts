// utils/http.ts
import { ApiError } from "@/types/error";
import { Response } from "express";
import { AuthRequest } from "@/types/request";
import { generateGetwatSecretToken } from "@/utils/jwt";
import axios, { AxiosRequestConfig } from "axios";

export const http = (url: string) =>
    async (req: AuthRequest, res: Response) => {
        try {
            const apiGatewayToken = generateGetwatSecretToken(req.user);

            const config : AxiosRequestConfig = {url , withCredentials:true, headers:{"x-apiGateway-token": apiGatewayToken}}
            console.log("heeereee========================>", config)
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
