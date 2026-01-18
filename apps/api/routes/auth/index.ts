import { Router } from "express";
import { AuthMiddleware } from "@/middlewares";
const router = Router();

import signupRoute from "./signup";
router.use("/signup", signupRoute);

import signinRoute from "./signin";
router.use("/signin", signinRoute);

import signoutRoute from "./signout";
router.use("/signout", AuthMiddleware, signoutRoute);

import meRoute from "./me";
router.use("/me", AuthMiddleware, meRoute);

import verifyOtpRoute from "./verify-otp";
router.use("/verify-otp", verifyOtpRoute);

export default router;
