import { Router } from "express";

import {
  listarDesafios,
  criarDesafio,
  editarDesafio,
  removerDesafio,
} from "../controllers/desafio.controller";

const router = Router();

router.get("/", listarDesafios);

router.post("/", criarDesafio);

router.put("/:id", editarDesafio);

router.delete("/:id", removerDesafio);

export default router;
