import { errorResponse } from "@/utils/responses";
import { Request, Response, NextFunction } from "express";

interface ApiError extends Error {
  statusCode?: number;
  details?: any;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log error
  console.error({
    message,
    // stack: err.stack,
    path: req.path,
    method: req.method,
    details: err.details || null,
  });

  // Response امن برای کاربر
  return errorResponse(res,statusCode,message,err.details);
};
