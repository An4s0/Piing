import { z } from "zod";

const scheduledAtSchema = z.string().datetime({ offset: true }).or(z.date());

export const createReminderSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(100, "Title is too long"),

  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .nullable()
    .optional(),

  scheduled_at: scheduledAtSchema,
});

export type CreateReminderInput = z.infer<typeof createReminderSchema>;
