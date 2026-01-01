import { z } from "zod";

export const getCaptchaSchema = z.object({
  body: z.object({
    uuid: z.string().optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});