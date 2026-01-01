import express, { Router } from "express";
import controller from "@/controlleres/auth.conroller";
import { validate } from "@/middlewares/validate.middleware";
import { sendOtpSchema , getCaptchaSchema } from "@english/contracts";

const router: Router = express.Router();

router.post("/send-otp",validate(sendOtpSchema),controller.sendOtp);
router.post("/get-captcha",validate(getCaptchaSchema),controller.getCaptcha);

export default router;