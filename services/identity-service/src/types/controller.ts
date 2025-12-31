import { Response, NextFunction } from "express";
import { AuthRequest } from "./request";

export type Controller<
  Body = {},
  Query = {},
  Params = {}
> = (
  req: AuthRequest<Params, any, Body, Query>,
  res: Response,
  next: NextFunction
) => Promise<any> | any;