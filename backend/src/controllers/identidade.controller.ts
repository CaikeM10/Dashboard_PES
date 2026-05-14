import { Request, Response } from "express";
import {
  getIdentidade,
  updateIdentidade,
} from "../services/identidade.service";

export async function listarIdentidade(req: Request, res: Response) {
  try {
    const identidade = await getIdentidade();

    return res.json(identidade);
  } catch (error) {
    console.error("Erro ao buscar identidade organizacional:", error);

    return res.status(500).json({
      error: "Erro ao buscar identidade organizacional",
    });
  }
}

export async function atualizarIdentidade(req: Request, res: Response) {
  try {
    const identidade = await updateIdentidade(req.body);

    return res.json(identidade);
  } catch (error) {
    console.error("Erro ao atualizar identidade organizacional:", error);

    return res.status(500).json({
      error: "Erro ao atualizar identidade organizacional",
    });
  }
}
