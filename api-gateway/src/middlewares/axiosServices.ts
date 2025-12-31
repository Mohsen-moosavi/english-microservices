import { getIdentityClient } from "@/axios/client";
import { configs } from "@/configs/env.config";
import { GatewayAxiosConfig } from "@/types/axios";
import { AuthRequest } from "@/types/request";
import { errorResponse } from "@/utils/responses";
import { NextFunction, Response } from "express";

export const forwardToIdentityService = (endPoint: string, isMultypartContent?: boolean) =>
    async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            const { body, query } = req.validated!;

            const identityClient = getIdentityClient(isMultypartContent)

            const response = await identityClient.request({
                method: req.method,
                baseURL: configs.serviceUrl.identityService!,
                url: endPoint,
                data: body,
                params: query,
                metadata: {
                    user: req.user
                }
            } as GatewayAxiosConfig);



            res.status(response.status).json(response.data);
        } catch (error: any) {
            if (error.response) {
                return errorResponse(res, error.response.status, error.response.data.message || "خطایی رخ داده است. لفطا دوباره تلاش کنید!")
            }
            next(error)
        }
    }
