import { registry } from "./registry";
import { getCaptchaBodySchema, resendOtpBodySchema, sendOtpBodySchema, } from "@english/contracts";

// get-captcha
registry.registerPath({
  method: "post",
  path: "/auth/get-captcha",
  tags: ["Auth"],
  request: {
    body:{
      content:{
        "application/json":{
          schema:getCaptchaBodySchema
        }
      }
    }
  },
  responses: {
    200: { description: "OK" }
  }
});

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


// resend-otp
registry.registerPath({
  method: "post",
  path: "/auth/resend-otp",
  tags: ["Auth"],
  request: {
    body:{
      content:{
        "application/json":{
          schema:resendOtpBodySchema
        }
      }
    }
  },
  responses: {
    200: { description: "OK" }
  }
});
