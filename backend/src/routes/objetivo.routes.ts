import { Router } from "express";
import {
  getObjetivos,
  createObjetivo,
} from "../controllers/objetivo.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.get("/", authMiddleware, getObjetivos);
router.post("/", authMiddleware, createObjetivo);

export default router;
