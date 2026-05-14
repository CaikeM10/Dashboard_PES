import { prisma } from "../lib/prisma";

export async function getIdentidade() {
  let identidade = await prisma.identidadeOrganizacional.findFirst();

  // Garante que sempre exista um registro único
  if (!identidade) {
    identidade = await prisma.identidadeOrganizacional.create({
      data: {},
    });
  }

  return identidade;
}

interface UpdateIdentidadeData {
  missao?: string;
  visao?: string;
  valores?: string;
}

export async function updateIdentidade(data: UpdateIdentidadeData) {
  const identidade = await getIdentidade();

  return prisma.identidadeOrganizacional.update({
    where: {
      id: identidade.id,
    },
    data: {
      missao: data.missao,
      visao: data.visao,
      valores: data.valores,
    },
  });
}
