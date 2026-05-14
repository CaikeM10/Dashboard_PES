import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10);

  await prisma.usuario.upsert({
    where: {
      email: "admin@pes.com",
    },
    update: {},
    create: {
      nome: "Administrador",
      email: "admin@pes.com",
      senha: senhaHash,
      role: "ADMIN",
    },
  });

  await prisma.usuario.upsert({
    where: {
      email: "coord@pes.com",
    },
    update: {},
    create: {
      nome: "Coordenador",
      email: "coord@pes.com",
      senha: senhaHash,
      role: "COORDENADOR",
    },
  });

  await prisma.usuario.upsert({
    where: {
      email: "sec@pes.com",
    },
    update: {},
    create: {
      nome: "Secretário",
      email: "sec@pes.com",
      senha: senhaHash,
      role: "SECRETARIO",
    },
  });

  console.log("Usuários criados 🚀");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
