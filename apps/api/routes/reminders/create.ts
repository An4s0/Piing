import { Router } from "express";
import { remindersService } from "@/services";
import type { ApiResponse, IReminder } from "@piing/types";
import { createReminderSchema } from "@piing/validation";

const router: Router = Router();

router.post("/", async (req, res, next) => {
  try {
    const parseResult = createReminderSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { title, description, scheduled_at } = parseResult.data;

    const reminder = await remindersService.create({
      user_id: req.user!.id,
      title,
      description,
      scheduled_at:
        scheduled_at instanceof Date ? scheduled_at : new Date(scheduled_at),
    });
    if (!reminder) {
      throw new Error("REMINDER_CREATION_FAILED");
    }

    res.status(201).json({
      success: true,
      data: {
        reminder,
      },
      error: null,
    } satisfies ApiResponse<{ reminder: IReminder }>);
  } catch (error) {
    next(error);
  }
});

export default router;
