import express, { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { proxy } from "../middlewares/proxy.middleware";

const router: Router = express.Router();

router.post(
  "/comments",
  authenticate,
  proxy("http://contact-service:4003")
);

export default router;


// export const getUserInfo = asyncHandler(async (req, res) => {
//   const response = await http({
//     method: "GET",
//     url: "http://auth-service/api/user/me",
//     headers: { Authorization: req.headers.authorization },
//   });
//   res.json(response.data);
// });
