import { Router } from "express";
import { usersService, otpsService, sessionsService } from "@/services";
import { generateToken } from "@/utils/jwt";
import type { IUser } from "@piing/types";
import type { ApiResponse } from "@piing/types";
import { verifyOtpSchema } from "@piing/validation";

const router: Router = Router();

router.post("/", async (req, res, next) => {
  try {
    const parseResult = verifyOtpSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { user_id, code } = req.body;

    const otp = await otpsService.findOne({
      user_id,
      code,
    });
    if (!otp) {
      throw new Error("OTP_NOT_FOUND");
    }

    const deletedOtp = await otpsService.delete(otp.id);
    if (!deletedOtp) {
      throw new Error("OTP_DELETE_FAILED");
    }

    const token = generateToken({
      id: user_id,
    });

    const session = await sessionsService.create({
      user_id,
      token,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    if (!session) {
      throw new Error("SESSION_CREATION_FAILED");
    }

    let user = (await usersService.update(user_id, {
      is_verified: true,
    })) as IUser;
    const { password_hash, ...safeUser } = user;

    res.status(201).json({
      success: true,
      data: {
        user: safeUser,
        token,
      },
      error: null,
    } satisfies ApiResponse<{ user: IUser; token: string }>);
  } catch (error) {
    next(error);
  }
});

export default router;
