import { Request } from "express";
import { appPermission } from "./permission";
import { JwtPayloadCustom } from "@/utils/jwt";

export interface AuthUser {
  id: number;
  role: string | null;
  permissions: appPermission[];
}

export type AuthRequest<
  Params = {},
  ResBody = any,
  ReqBody = {},
  Query = {}
> = Request<Params, ResBody, ReqBody, Query> & {
  user?: AuthUser;
  decodeGateway?: JwtPayloadCustom;
};