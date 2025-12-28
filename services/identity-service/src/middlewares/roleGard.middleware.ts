import { Controller } from "@/types/controller";
import { appPermission } from "@/types/permission";
import { errorResponse } from "@/utils/responses";

export const roleGuard =
    (necessaryPermissions: appPermission): Controller =>
        (req, res, next) => {

            if(!req.user){
                return errorResponse(res,401,"درخواست نامعتبر")
            }
            const permissions = req.user.permissions ?? []
            const isallowed = permissions.includes(necessaryPermissions);

            if (!isallowed) {
                return errorResponse(res, 403, "شما به این بخش دستری ندارید.")
            } else {
                next()
            }

        }