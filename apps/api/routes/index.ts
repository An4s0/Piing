import { Router } from "express";
const router = Router();

import authRoutes from "./auth";
router.use("/auth", authRoutes);

import remindersRoutes from "./reminders";
router.use("/reminders", remindersRoutes);

export default router;
