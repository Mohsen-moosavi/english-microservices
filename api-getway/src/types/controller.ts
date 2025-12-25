import { Request, Response, NextFunction } from 'express';

export type Controller<
  ReqBody = any,
  ReqParams = any,
  ReqQuery = any,
  ResBody = any
> = (
  req: Request<ReqParams, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody>,
  next: NextFunction
) => Promise<any> | any;
