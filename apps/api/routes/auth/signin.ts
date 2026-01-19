import { Router } from "express";
import bcrypt from "bcryptjs";
import { signinSchema } from "@piing/validation";
import { usersService, otpsService } from "@/services";
import { sendOtp } from "@/utils/send-otp";
import type { ApiResponse } from "@piing/types";
import type { IUser } from "@piing/types";

const router: Router = Router();

router.post("/", async (req, res, next) => {
  try {
    const parseResult = signinSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { email, password } = parseResult.data;

    const user = (await usersService.findOne({
      email: email.toLowerCase(),
    })) as IUser;
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const isValid = await bcrypt.compare(password, user.password_hash!);

    if (!isValid) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otp = await otpsService.create({
      user_id: user.id,
      code: otpCode,
      expires_at: new Date(Date.now() + 10 * 60 * 1000), // 10 Minutes
    });
    if (!otp) {
      throw new Error("OTP_CREATION_FAILED");
    }

    await sendOtp({
      to: email,
      otp: otpCode,
    });

    const { password_hash, ...safeUser } = user;
    res.json({
      success: true,
      data: { user: safeUser },
      error: null,
    } satisfies ApiResponse<{ user: IUser }>);
  } catch (error) {
    next(error);
  }
});

export default router;
