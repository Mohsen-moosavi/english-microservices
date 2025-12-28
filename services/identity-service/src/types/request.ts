import { Request } from "express";
import { appPermission } from "./permission";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string | null;
    permissions : appPermission[]
  };
}
