import { Router } from "express";
import { remindersService } from "@/services";
import type { ApiResponse, IReminder } from "@piing/types";

const router: Router = Router();

router.get("/", async (req, res, next) => {
  try {
    const reminders = await remindersService.findMany({
      user_id: req.user!.id,
    });

    res.status(201).json({
      success: true,
      data: {
        reminders,
      },
      error: null,
    } satisfies ApiResponse<{ reminders: IReminder[] }>);
  } catch (error) {
    next(error);
  }
});

export default router;
