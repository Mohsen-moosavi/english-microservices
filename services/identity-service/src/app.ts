import express , {Express} from "express"
import allRoutes from "@/routes/index"
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler";
import { errorResponse } from "./utils/responses";
import { gatewayContext } from "./middlewares/gatewayContext";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(gatewayContext)
app.use("/identity-service",allRoutes)




app.use(errorHandler)

app.use((req, res) => {
    return errorResponse(res,404,`مسیر ${req.path} یافت نشد!`)
});


export default app;