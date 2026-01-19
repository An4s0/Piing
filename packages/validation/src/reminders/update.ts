import { z } from "zod";

const scheduledAtSchema = z.string().datetime({ offset: true }).or(z.date());

export const updateReminderSchema = z.object({
  title: z.string().trim().min(1).max(100).optional(),

  description: z.string().trim().max(500).nullable().optional(),

  scheduled_at: scheduledAtSchema.optional(),
});

export type UpdateReminderInput = z.infer<typeof updateReminderSchema>;
