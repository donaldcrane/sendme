import { Router } from "express";
import userRoutes from "./userRoutes";
import creditRoutes from "./creditRoutes";
import debitRoutes from "./debitRoutes";

const router = new Router();

router.use("/", userRoutes);
router.use("/auth", creditRoutes);
router.use("/auth", debitRoutes);

export default router;
