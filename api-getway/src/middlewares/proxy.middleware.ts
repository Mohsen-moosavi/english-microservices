import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response, NextFunction } from "express";
import { ClientRequest } from "http";
import { ApiError } from "@/types/error";
import { configs } from "@/configs/env.config";
import { generateGetwatSecretToken } from "@/utils/jwt";

export const proxy = (target: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq(proxyReq: ClientRequest, req: Request, res: Response) {

      if (req.user) {
        const apiGatewayToken = generateGetwatSecretToken(req.user.id, req.user.role , req.user.permissions);
        proxyReq.setHeader("x-apiGateway-token", apiGatewayToken);
      }
    },
    onError(err: unknown, req: Request, res: Response, next: NextFunction) {
      const status = (err as any).response?.status || 500;
      const data = (err as any).response?.data || null;
      const message = status === 404 ? "آدرس مورد نظر یافت نشد" : (err as any).response?.data?.message || "Service Error";


      next(new ApiError(
        message,
        status,
        data
      ))
    }
  } as any);

