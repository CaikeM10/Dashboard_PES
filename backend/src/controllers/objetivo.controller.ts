import { Request, Response } from "express";
import * as objetivoService from "../services/objetivo.service";

// 🔍 GET - listar objetivos
export async function getObjetivos(req: Request, res: Response) {
  try {
    const objetivos = await objetivoService.getObjetivos();
    res.json(objetivos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar objetivos" });
  }
}

// ➕ POST - criar objetivo
export async function createObjetivo(req: Request, res: Response) {
  try {
    const { titulo, descricao, indicador } = req.body;

    const novo = await objetivoService.createObjetivo({
      titulo,
      descricao,
      indicador,
    });

    res.json(novo);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar objetivo" });
  }
}
