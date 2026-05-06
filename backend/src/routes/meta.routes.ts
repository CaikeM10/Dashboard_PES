import { Router } from "express";
import { getMetas, createMeta } from "../controllers/meta.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, getMetas);
router.post("/", authMiddleware, createMeta);

export default router;
