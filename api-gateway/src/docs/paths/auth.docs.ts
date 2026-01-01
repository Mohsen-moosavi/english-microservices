import { registry } from "./registry";
import { sendOtpBodySchema, } from "@english/contracts";

// send-otp
registry.registerPath({
  method: "post",
  path: "/auth/send-otp",
  tags: ["Auth"],
  request: {
    body:{
      content:{
        "application/json":{
          schema:sendOtpBodySchema
        }
      }
    }
  },
  responses: {
    200: { description: "OK" }
  }
});