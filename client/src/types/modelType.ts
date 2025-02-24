import { z } from "zod";

export const ModelInfoSchema = z
  .object({
    model: z.string(),
    size: z.string().optional(),
    parameter_size: z.string().optional(),
  })
  .required({
    model: true,
  });

export const ModelListSchema = z.object({
  models: z.array(ModelInfoSchema).default([]),
});

export const ModelErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type ModelInfoType = z.infer<typeof ModelInfoSchema>;
export type ModelListType = z.infer<typeof ModelListSchema>;
export type ModelErrorType = z.infer<typeof ModelErrorSchema>;
