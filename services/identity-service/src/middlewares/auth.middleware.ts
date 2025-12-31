import { Middleware } from "@/types/middleware";
import { errorResponse } from "@/utils/responses";

export const gatewayContext: Middleware = (req, res, next) => {

  const userDate = req.decodeGateway;

  if(!userDate || userDate.userid || userDate.role){
    return errorResponse(res,401,"در خواست نامعتبر1");
  }

    req.user = {
      id: Number(userDate.userid),
      role: userDate.role,
      permissions: userDate.permissions ?? []
    };

    next();
};
