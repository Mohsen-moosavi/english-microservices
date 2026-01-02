import express, { Router } from "express";
import controller from "@/controlleres/auth.conroller";
import { validate } from "@/middlewares/validate.middleware";
import { sendOtpSchema , getCaptchaSchema, resendOtpSchema } from "@english/contracts";

const router: Router = express.Router();

router.post("/get-captcha",validate(getCaptchaSchema),controller.getCaptcha);
router.post("/send-otp",validate(sendOtpSchema),controller.sendOtp);
router.post("/resend-otp",validate(resendOtpSchema),controller.resendOtp);

export default router;