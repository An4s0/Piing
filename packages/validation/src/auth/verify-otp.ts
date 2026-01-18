import { z } from "zod";

export const verifyOtpSchema = z.object({
  user_id: z.string().uuid(),
  code: z.string().length(6),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
