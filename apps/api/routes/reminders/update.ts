import { Router } from "express";
import { remindersService } from "@/services";
import type { ApiResponse, IReminder } from "@piing/types";
import { updateReminderSchema } from "@piing/validation";

const router: Router = Router();

router.put("/:id", async (req, res, next) => {
  try {
    const parseResult = updateReminderSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { title, description, scheduled_at } = parseResult.data;
    const reminderId = req.params.id;

    const scheduledAt =
      scheduled_at instanceof Date
        ? scheduled_at
        : scheduled_at
          ? new Date(scheduled_at)
          : undefined;

    const reminder = await remindersService.findOne({
      id: reminderId,
      user_id: req.user!.id,
    });
    if (!reminder) {
      throw new Error("UNAUTHORIZED");
    }

    const updates = {
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(scheduledAt !== undefined && { scheduled_at: scheduledAt }),
    };

    const updatedReminder = await remindersService.update(reminderId, updates);
    if (!reminder) {
      throw new Error("REMINDER_UPDATE_FAILED");
    }

    res.status(201).json({
      success: true,
      data: {
        reminder: updatedReminder,
      },
      error: null,
    } satisfies ApiResponse<{ reminder: IReminder }>);
  } catch (error) {
    next(error);
  }
});

export default router;
