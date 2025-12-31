import { Response } from 'express';

/**
 * Success response helper
 */
export function successResponse<T>(
  res: Response,
  statusCode: number = 200,
  message: string,
  data?: T
): Response {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
  });
}

/**
 * Error response helper
 */
export function errorResponse<T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
): Response {
  console.error({ message, data });

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
    data,
  });
}
