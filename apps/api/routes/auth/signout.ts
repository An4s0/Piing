import { Router } from "express";
import { sessionsService } from "@/services";
import type { ApiResponse } from "@piing/types";

const router: Router = Router();

router.post("/", async (req, res, next) => {
  try {
    const session = await sessionsService.findOne({ token: req.token });

    const deletedSession = await sessionsService.delete(session!.id!);
    if (!deletedSession) {
      throw new Error("SESSION_DELETE_FAILED");
    }
    res.json({
      success: true,
      data: {},
      error: null,
    } satisfies ApiResponse<{}>);
  } catch (error) {
    next(error);
  }
});

export default router;
