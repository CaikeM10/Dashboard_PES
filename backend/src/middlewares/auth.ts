import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

interface TokenPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Token não fornecido",
      });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({
        error: "Token inválido",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}
