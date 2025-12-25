// middlewares/gatewayContext.ts
import { Controller } from "@/types/controller";
import { errorResponse } from "@/utils/responses";

export const gatewayContext : Controller = (req ,res ,next) => {
  const userId = req.headers["x-user-id"];
  const userRole = req.headers["x-user-role"];

  if (!userId || typeof userId !== "string") {
    return errorResponse(res,401,"Unauthorized (missing user context)")
  }

  req.user = {
    id: userId,
    role: typeof userRole === "string" ? userRole : "",
  };

  next();
};
