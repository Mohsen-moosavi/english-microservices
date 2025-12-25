import express from "express";
import { gatewayContext } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/comments",gatewayContext);

export default router;