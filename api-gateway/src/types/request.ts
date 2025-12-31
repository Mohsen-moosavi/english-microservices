import { Request } from "express";

export interface AuthUser {
  id: number;
  role: string;
  permissions: string[];
}

// export type ValidatedParams<T> = {
//   body: T extends { body: infer B } ? B : never;
//   query: T extends { query: infer Q } ? Q : never;
//   params: T extends { params: infer P } ? P : never;
// };

export type ValidatedParams<
    B = unknown,
    Q = unknown,
    P = unknown
> = {
    body?: B;
    query?: Q;
    params?: P;
};


export type AuthRequest<
  Params = {},
  ResBody = any,
  ReqBody = {},
  Query = {}
> = Request<Params, ResBody, ReqBody, Query> & {
  user?: AuthUser;
  validated? : ValidatedParams
};