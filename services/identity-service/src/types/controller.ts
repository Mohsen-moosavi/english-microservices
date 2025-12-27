import { Response, NextFunction } from 'express';
import { AuthRequest } from './request';

export type Controller = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => any;
