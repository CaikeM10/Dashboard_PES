import { Router } from "express";
import {
  listarIdentidade,
  atualizarIdentidade,
} from "../controllers/identidade.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Qualquer usuário autenticado pode visualizar
router.get("/", authMiddleware, listarIdentidade);

// Qualquer usuário autenticado pode atualizar
// (se quiser restringir depois, podemos aplicar controle por role)
router.put("/", authMiddleware, atualizarIdentidade);

export default router;
