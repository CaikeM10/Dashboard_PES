import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMetas() {
  return prisma.meta.findMany();
}

export async function createMeta(data: any) {
  return prisma.meta.create({
    data,
  });
}
