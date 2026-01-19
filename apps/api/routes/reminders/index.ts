import { Router } from "express";
import { AuthMiddleware } from "@/middlewares";
const router = Router();

import createReminderRoute from "./create";
router.use("/", AuthMiddleware, createReminderRoute);

import getRemindersRoute from "./get";
router.use("/", AuthMiddleware, getRemindersRoute);

import updateReminderRoute from "./update";
router.use("/", AuthMiddleware, updateReminderRoute);

export default router;
