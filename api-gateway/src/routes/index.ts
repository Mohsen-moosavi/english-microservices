import {Router} from "express";
import identityRouter from "@/routes/auth";

const router : Router = Router();

router.use("/auth",identityRouter);

export default router;
