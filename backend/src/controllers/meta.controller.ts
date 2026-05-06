import { Request, Response } from "express";
import * as metaService from "../services/meta.service";

export async function getMetas(req: Request, res: Response) {
  try {
    const metas = await metaService.getMetas();
    res.json(metas);
  } catch {
    res.status(500).json({ error: "Erro ao buscar metas" });
  }
}

export async function createMeta(req: Request, res: Response) {
  try {
    const { descricao, status, percentual } = req.body;

    const novaMeta = await metaService.createMeta({
      descricao,
      status,
      percentual,
    });

    res.json(novaMeta);
  } catch {
    res.status(500).json({ error: "Erro ao criar meta" });
  }
}
