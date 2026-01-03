import { boolean } from "zod";
import { registry } from "./registry";
import { getCaptchaBodySchema, getErrorResponseSchema, getSuccessResponseSchema, resendOtpBodySchema, sendOtpBodySchema, verifyOtpBodySchema, } from "@english/contracts";

// get-captcha
registry.registerPath({
  method: "post",
  path: "/auth/get-captcha",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: getCaptchaBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: getSuccessResponseSchema(200, 'کد کپچا با موفقیت ایجاد شد.', { uuid: 54495, captcha: "456h75" })
        },
      },
    },
  }
});

// send-otp
registry.registerPath({
  method: "post",
  path: "/auth/send-otp",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: sendOtpBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: getSuccessResponseSchema(200, `کد با موفقیت ارسال شد`)
        },
      },
    },
    429: {
      description: "OK",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(429, "تعداد دفعات مجاز برای درخواست ارسال کد از طریق پیامک به پایان رسیده است، لطفا بعدا تلاش کنید.")
        }
      },
    },
    423: {
      description: "OK",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(423, "لطفا چند دقیقه بعد، مجددا تلاش کنید.")
        },
      },
    },
    400: {
      description: "OK",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(400, `کد فرستاده شده هنوز منقضی نشده. لفطا مدتی بعد مجددا تلاش کنید.`)
        }

      },
    },
    409: {
      description: "OK",
      content: {
        "application/json": {
          schema: getSuccessResponseSchema(409, "این شماره قبلا ثبت شده است!")
        },
      },
    },
  },
});


// resend-otp
registry.registerPath({
  method: "post",
  path: "/auth/resend-otp",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: resendOtpBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: getSuccessResponseSchema(200, `کد با موفقیت ارسال شد`)
        },
      },
    },
    410: {
      description: "OK",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(410, "کد منقضی شده است. لطفا دوباره در خواست کنید.")
        },
      },
    },
    400: {
      description: "OK",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(400, "کد ارسال شده است. لطفا کمی صبر کنید!")
        },
      },
    },
  }
});


// verify-code
registry.registerPath({
  method: "post",
  path: "/auth/verify-code",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: verifyOtpBodySchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: getSuccessResponseSchema(200, "شماره تلفن با موفقیت احراز شد", { verifiedPhoneCode: "22113" })
        },
      },
    },
    400: {
      description: "ERROR",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(400, "کد نادرست است!")
        },
      },
    },
    410: {
      description: "ERROR",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(410, "کد منقضی شده است. لطفا دوباره درخواست کنید!")
        },
      },
    },
    429: {
      description: "ERROR",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(429, "تعداد دفعات مجاز برای وارد کردن کد، به پایان رسیده است.")
        },
      },
    },
    423: {
      description: "ERROR",
      content: {
        "application/json": {
          schema: getErrorResponseSchema(423, "تعداد دفعات مجاز برای وارد کردن کد، به پایان رسیده است.")
        },
      },
    },
  },
});
