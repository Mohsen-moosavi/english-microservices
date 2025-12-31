import { Response, NextFunction } from 'express';
import { AuthRequest } from './request';

export type Middleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => any;
