import { Middleware } from "@/types/middleware";
import { insecureRequestHandler, setSecureLog } from "@/utils/invalidRequest";
import { verifyApiGatewayToken } from "@/utils/jwt";
import { errorResponse } from "@/utils/responses";

export const gatewayContext: Middleware = (req, res, next) => {

  const apiGatewayToken = req.headers["x-apigateway-token"];

  
  if (typeof apiGatewayToken === "string") {
    const decoded = verifyApiGatewayToken(apiGatewayToken);


    if (!decoded || decoded.tokenType !== "gateway") {
      insecureRequestHandler(apiGatewayToken, req.ip)
      return errorResponse(res, 401, "درخواست نا معتبر");
    }

    req.decodeGateway = decoded;

    req.user = {
      id: Number(decoded.userid),
      role: decoded.role,
      permissions: decoded.permissions ?? []
    };

    next();
  }else{ 
    setSecureLog(undefined,req.ip,"INVALID_GATEWAY_SECRET","x-gateway-token missing or invalid");
    return errorResponse(res, 401, "درخواست نا معتبر");
  }
};
