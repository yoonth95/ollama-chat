import { z } from "zod";

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string(),
});

export const chatResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  messages: z.array(chatMessageSchema),
  created_at: z.string(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
