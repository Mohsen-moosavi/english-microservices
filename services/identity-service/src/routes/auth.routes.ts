import express from "express";
import { gatewayContext } from "../middlewares/auth.middleware";
import { sendOtpValidator } from "@/validators/auth.validator";
import controller from "@/controlleres/auth.conroller";

const router = express.Router();

router.post("/send-otp",gatewayContext,sendOtpValidator(),controller.sendOtp);

export default router;