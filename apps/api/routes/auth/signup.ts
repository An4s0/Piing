import { Router } from "express";
import bcrypt from "bcryptjs";
import { signupSchema } from "@piing/validation";
import { usersService, otpsService } from "@/services";
import { sendOtp } from "@/utils/send-otp";
import type { ApiResponse } from "@piing/types";
import type { IUser } from "@piing/types";

const router: Router = Router();

router.post("/", async (req, res, next) => {
  try {
    const parseResult = signupSchema.safeParse(req.body);
    if (!parseResult.success) {
      throw parseResult.error;
    }

    const { name, email, password } = parseResult.data;

    const existingUser = await usersService.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const user = await usersService.create({
      name,
      email,
      password_hash: await bcrypt.hash(password, 10),
    });
    if (!user) {
      throw new Error("USER_CREATION_FAILED");
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
