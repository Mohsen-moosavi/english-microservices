import express,{Express} from "express"
import allRoutes from "@/routes/index"
import cors from "cors"
import { corsOptions } from "./configs/cors.config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler";
import { errorResponse } from "./utils/responses";
import swaggerUi from "swagger-ui-express";
import { openApiDoc } from "./docs/openapi";

const app : Express= express();

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDoc));
app.use("/api/v1",allRoutes)




app.use(errorHandler)

app.use((req, res) => {
    return errorResponse(res,404,`مسیر ${req.path} یافت نشد!`)
});


export default app;