import { z } from "zod";

export const sendOtpSchema = z.object({
  body: z.object({
    phone: z.string().regex(/^\+98\d{10}$/,"شماره موبایل وارد شده معتبر نمی باشد!"),
    captcha: z.string().min(5,"کد امنیتی باید 5 قم باشد.").max(5,"کد امنیتی باید 5 قم باشد."),
    uuid: z.string(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});