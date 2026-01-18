import { Router } from "express";
import { sessionsService } from "@/services";
import type { ApiResponse, ISession } from "@/types";
import type { IUser } from "@piing/types";

const router: Router = Router();

router.get("/", async (req, res, next) => {
  try {
    const session = await sessionsService.findOne({ token: req.token });
    if (!session) {
      throw new Error("SESSION_NOT_FOUND");
    }

    res.status(201).json({
      success: true,
      data: {
        user: req.user as IUser,
        token: req.token as string,
        session,
      },
      error: null,
    } satisfies ApiResponse<{ user: IUser; token: string; session: ISession }>);
  } catch (error) {
    next(error);
  }
});

export default router;
