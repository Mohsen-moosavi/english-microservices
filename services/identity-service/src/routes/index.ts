import {Router} from "express";
import contactRouter from "@/routes/contact";

const router = Router();

router.use("/contact",contactRouter);

export default router;
