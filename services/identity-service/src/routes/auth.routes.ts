import express from "express";
import { sendOtpValidator } from "@/validators/auth.validator";
import controller from "@/controlleres/auth.conroller";

const router = express.Router();

router.post("/send-otp",sendOtpValidator(),controller.sendOtp);

export default router;