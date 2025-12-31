import { Controller } from "@/types/controller";
import { AuthRequest } from "@/types/request";

export const asyncHandler =
  <Body = {}, Query = {}, Params = {}>(
    controller: Controller<Body, Query, Params>
  ): Controller<Body, Query, Params> =>
    (req: AuthRequest<Params, any, Body, Query>, res, next) =>
      Promise.resolve(controller(req, res, next)).catch(next);
