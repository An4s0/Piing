import { Router } from "express";
const router = Router();

import signupRoute from "./signup";
router.use("/signup", signupRoute);

import signinRoute from "./signin";
router.use("/signin", signinRoute);

import verifyOtpRoute from "./verify-otp";
router.use("/verify-otp", verifyOtpRoute);

export default router;
