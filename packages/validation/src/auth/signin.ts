import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 8 characters"),
});

export type SignInInput = z.infer<typeof signinSchema>;
