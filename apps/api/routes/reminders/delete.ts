import { Router } from "express";
import { remindersService } from "@/services";
import type { ApiResponse } from "@piing/types";

const router: Router = Router();

router.delete("/:id", async (req, res, next) => {
  try {
    const reminderId = req.params.id;

    const reminder = await remindersService.findOne({
      id: reminderId,
      user_id: req.user!.id,
    });
    if (!reminder) {
      throw new Error("UNAUTHORIZED");
    }

    const deletedReminder = await remindersService.delete(reminderId);
    if (!deletedReminder) {
      throw new Error("REMINDER_DELETE_FAILED");
    }

    res.status(201).json({
      success: true,
      data: {},
      error: null,
    } satisfies ApiResponse<{}>);
  } catch (error) {
    next(error);
  }
});

export default router;
