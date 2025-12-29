import { requestValidationErrorHandler } from "@/utils/requestValidation";
import { body } from "express-validator";

export function sendOtpValidator(){
    return [
        body('phone').isMobilePhone("fa-IR" , {strictMode : true}).withMessage("شماره وارد شده معتبر نمی باشد."),
        body('captcha').isString().isLength({min:5,max:5}).withMessage("کد نامعتبر است."),
        body('uuid').isString().withMessage("کد نامعتبر است."),
        requestValidationErrorHandler
    ]
}