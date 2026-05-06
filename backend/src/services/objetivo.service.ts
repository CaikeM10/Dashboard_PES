import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getObjetivos() {
  return prisma.objetivo.findMany();
}

export async function createObjetivo(data: any) {
  return prisma.objetivo.create({
    data,
  });
}
