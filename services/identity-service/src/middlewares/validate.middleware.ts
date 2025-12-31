import { AuthRequest } from "@/types/request";
import { errorResponse } from "@/utils/responses";
import { NextFunction, Response } from "express";

export const validate =
    (schema: any) =>
        (req: AuthRequest, res: Response, next: NextFunction) => {
            const result = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!result.success) {
                return errorResponse(res, 400, "داده ی نامعتبر!");
            }

            next();
        };