import { Controller } from "@/types/controller";
import { validationResult } from "express-validator";
import { errorResponse } from "./responses";

export const requestValidationErrorHandler : Controller = (req,res,next)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, errors.array()[0]?.msg ??  "ورودی نامعتبر" );
  }
  next();
}