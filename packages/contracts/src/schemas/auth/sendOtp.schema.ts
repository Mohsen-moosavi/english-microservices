import  z  from "./../../generateZodInstance";

export const sendOtpBodySchema = z.object({
  phone: z
    .string("نوع داده ی وارد شده به عنوان شماره تلفن، صحیح نمی باشد.")
    .regex(/^\+98\d{10}$/, "شماره موبایل وارد شده معتبر نمی باشد!")
    .openapi({ default: "+989391231213" }),
  captcha: z
    .string()
    .min(5, "کد امنیتی باید 5 قم باشد.")
    .max(5, "کد امنیتی باید 5 قم باشد.")
    .openapi({ default: "11122" }),
  uuid: z
    .string()
    .openapi({ default: "23321" }),
})

export const sendOtpSchema = z.object({
  body: sendOtpBodySchema,
});