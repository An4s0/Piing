import { z } from "zod";

export const otpSchema = z.object({
  code: z
    .string()
    .regex(/^\d{6}$/, "OTP must be 6 digits"),
});

export type OtpInput = z.infer<typeof otpSchema>;
