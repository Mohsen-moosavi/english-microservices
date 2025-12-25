import { Controller } from "@/types/controller";
import { verifyAccessToken } from "@/utils/jwt";
import { errorResponse } from "@/utils/responses";


export const authenticate : Controller = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  if(!token){
    return  errorResponse(res,401,"توکن یافت نشد!")
  }

  try {
    const payload = verifyAccessToken(token);

    if(!payload){
      return  errorResponse(res,401,"توکن معتبر نیست!")
    }

    req.user = {
      id: payload.sub,
      role: payload.role,
    };
    next();
  } catch {
    errorResponse(res,401,"توکن یافت نشد!")
  }
};
