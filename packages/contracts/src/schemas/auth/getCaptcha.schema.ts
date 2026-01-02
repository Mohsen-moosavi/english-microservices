import z from "./../../generateZodInstance";

export const getCaptchaBodySchema = z.object({
  uuid: z.string().optional(),
})

export const getCaptchaSchema = z.object({
  body: getCaptchaBodySchema
});