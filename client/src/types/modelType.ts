import { z } from "zod";

export const ModelInfoSchema = z.object({
  model: z.string(),
  size: z.string().optional(),
  parameter_size: z.string().optional(),
});

export const ModelInfoArraySchema = z.array(ModelInfoSchema);

export const ModelErrorSchema = z.object({
  status: z.number(),
  message: z.string(),
});

export type ModelInfoType = z.infer<typeof ModelInfoSchema>;
export type ModelErrorType = z.infer<typeof ModelErrorSchema>;
