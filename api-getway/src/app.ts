import express from "express"
import allRoutes from "@/routes/index"
import cors from "cors"
import { corsOptions } from "./configs/cors.config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler";
import { errorResponse } from "./utils/responses";

const app = express();

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/v1",allRoutes)




app.use(errorHandler)

app.use((req, res) => {
    return errorResponse(res,404,`مسیر ${req.path} یافت نشد!`)
});


export default app;