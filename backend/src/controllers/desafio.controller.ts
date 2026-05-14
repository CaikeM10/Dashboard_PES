import { Request, Response } from "express";
import {
  getDesafios,
  createDesafio,
  updateDesafio,
  deleteDesafio,
} from "../services/desafio.service";

export async function listarDesafios(req: Request, res: Response) {
  const desafios = await getDesafios();

  res.json(desafios);
}

export async function criarDesafio(req: Request, res: Response) {
  try {
    const desafio = await createDesafio(req.body);

    res.status(201).json(desafio);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao criar desafio",
    });
  }
}

export async function editarDesafio(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const desafio = await updateDesafio(id, req.body);

    res.json(desafio);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao atualizar desafio",
    });
  }
}

export async function removerDesafio(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await deleteDesafio(id);

    res.json({
      message: "Desafio removido com sucesso",
    });
  } catch (error) {
    res.status(500).json({
      error: "Erro ao remover desafio",
    });
  }
}
