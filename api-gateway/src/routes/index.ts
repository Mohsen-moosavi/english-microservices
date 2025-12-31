import {Router} from "express";
import identityRouter from "@/routes/auth";

const router : Router = Router();

router.use("/identity",identityRouter);

export default router;
