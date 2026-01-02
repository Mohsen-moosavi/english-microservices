import { Router } from "express";
import { forwardToIdentityService } from "@/middlewares/axiosServices";
import { validate } from "@/middlewares/validation";
import { getCaptchaSchema, resendOtpSchema, sendOtpSchema } from "@english/contracts";

const router : Router = Router();

// router.post(
//   "/send-otp",
//   authenticate,
//   proxy("http://localhost:4001/identity-service/auth/send-otp")
// );

// router.post(
//   "/send-otp",http("http://localhost:3001/identity-service/auth")
// );

router.post('/send-otp',validate(sendOtpSchema),forwardToIdentityService("/auth/send-otp"));
router.post('/resend-otp',validate(resendOtpSchema),forwardToIdentityService("/auth/resend-otp"));
router.post('/get-captcha',validate(getCaptchaSchema),forwardToIdentityService("/auth/get-captcha"));

export default router;