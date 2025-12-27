import { createProxyMiddleware } from "http-proxy-middleware";
import { Request, Response, NextFunction } from "express";
import { ClientRequest } from "http";
import { ApiError } from "@/types/error";
import { AuthRequest } from "@/types/request";

export const proxy = (target: string) =>
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq(proxyReq: ClientRequest, req: AuthRequest, res: Response) {
      if (req.user) {
        proxyReq.setHeader("x-user-id", req.user.id);
        if (req.user.role) {
          proxyReq.setHeader("x-user-role", req.user.role);
        }
      }
    },
    onError(err: unknown, req:Request, res:Response,next:NextFunction) {
      const status = (err as any).response?.status || 500;
      const data = (err as any).response?.data || null;
      const message = status===404 ? "آدرس مورد نظر یافت نشد" : (err as any).response?.data?.message || "Service Error";

       
      next(new ApiError(
        message,
        status,
        data
      ))
    }
  }as any);

