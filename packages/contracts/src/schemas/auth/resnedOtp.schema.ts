import  z  from "./../../generateZodInstance";

export const resendOtpBodySchema = z.object({
  phone: z
    .string("نوع داده ی وارد شده به عنوان شماره تلفن، صحیح نمی باشد.")
    .regex(/^\+98\d{10}$/, "شماره موبایل وارد شده معتبر نمی باشد!")
    .openapi({ default: "+989391231213" }),
})

export const resendOtpSchema = z.object({
  body: resendOtpBodySchema,
});