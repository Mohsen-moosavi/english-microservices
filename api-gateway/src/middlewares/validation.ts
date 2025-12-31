import { AuthRequest, ValidatedParams } from "@/types/request";
import { errorResponse } from "@/utils/responses";
import { NextFunction, Response } from "express";
import z from "zod";


export const validate =
    <T extends z.ZodType<ValidatedParams>>(schema: T) =>
        (req: AuthRequest, res: Response, next: NextFunction) => {
            const result = schema.safeParse({
                body: req.body,
                query: req.query,
                params: req.params,
            });

            if (!result.success) {
                return errorResponse(res, 400, result.error.issues[0]?.message || "مقادیر وارد شده، درست نمی باشند");
            }

            req.validated = result.data;
            next();
        };
