import { prisma } from "../lib/prisma";

export async function getDesafios() {
  return prisma.desafio.findMany({
    include: {
      objetivos: true,
    },
  });
}

export async function createDesafio(data: {
  titulo: string;
  descricao?: string;
}) {
  return prisma.desafio.create({
    data,
  });
}

export async function updateDesafio(
  id: string,
  data: {
    titulo?: string;
    descricao?: string;
  },
) {
  return prisma.desafio.update({
    where: { id },
    data,
  });
}

export async function deleteDesafio(id: string) {
  return prisma.desafio.delete({
    where: { id },
  });
}
