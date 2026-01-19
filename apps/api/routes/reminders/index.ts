import { Router } from "express";
import { AuthMiddleware } from "@/middlewares";
const router = Router();

import createReminderRoute from "./create";
router.use("/", AuthMiddleware, createReminderRoute);

export default router;
