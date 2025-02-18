import { z } from "zod";

export const ModelInfoSchema = z
  .object({
    name: z.string(),
    size: z.bigint().optional(),
    modified_at: z.string().optional(),
  })
  .required({
    name: true,
  });

export const ModelListSchema = z.object({
  models: z.array(ModelInfoSchema).default([]),
});

export type ModelInfoType = z.infer<typeof ModelInfoSchema>;
export type ModelListType = z.infer<typeof ModelListSchema>;
