import { Router } from "express";
import type { ApiResponse } from "@piing/types";
import type { IUser } from "@piing/types";

const router: Router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: {
        user: req.user as IUser,
        token: req.token as string,
      },
      error: null,
    } satisfies ApiResponse<{ user: IUser; token: string }>);
  } catch (error) {
    next(error);
  }
});

export default router;
