import { Response, NextFunction } from "express";

export function requireRole(role: string) {
  return (req: any, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
}

// 🔥 NOVO (MULTI ROLE)
export function requireRoles(roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    next();
  };
}
