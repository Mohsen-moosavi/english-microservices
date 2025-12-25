import { Controller } from "@/types/controller";
import { Action, Resource } from "@/types/permission";
import { errorResponse } from "@/utils/responses";

export const can =
  (resource: Resource, action: Action): Controller =>
    async (req, res, next) => {
      const permission = `${resource}:${action}`;

      const user = req.user;
      if (!user) return errorResponse(res,401,"کاربر نامعتبر!");

      const permissions = await getPermissionsByRole(user.role);

      if (!permissions.includes(permission)) {
        return errorResponse(res,403,"شما به این بخش دسترسی ندارید!")
      }

      next();
    }