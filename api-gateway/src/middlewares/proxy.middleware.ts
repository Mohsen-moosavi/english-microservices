import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response, NextFunction } from "express";
import { ClientRequest } from "http";
import { ApiError } from "@/types/error";
import { generateGetwatSecretToken } from "@/utils/jwt";
import { AuthRequest } from "@/types/request";

export const proxy = (target: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq(proxyReq: ClientRequest, req: AuthRequest, res: Response) {
      
      const apiGatewayToken = generateGetwatSecretToken(req.user);

      console.log("heeereee========================>", apiGatewayToken)
      proxyReq.setHeader("x-apiGateway-token", apiGatewayToken);
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

