export const ROLES = {
  ADMIN: "ADMIN",
  COORDENADOR: "COORDENADOR",
  SECRETARIO: "SECRETARIO",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
