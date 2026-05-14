import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { prisma } from "./lib/prisma";

import metaRoutes from "./routes/meta.routes";
import objetivoRoutes from "./routes/objetivo.routes";
import desafioRoutes from "./routes/desafio.routes";
import identidadeRoutes from "./routes/identidade.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/identidade", identidadeRoutes);

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

app.get("/", (req, res) => {
  res.send("API PES funcionando 🚀");
});

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    console.log(email, senha);

    const usuario = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });

    console.log(usuario);

    if (!usuario) {
      return res.status(401).json({
        error: "Usuário não encontrado",
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    console.log(senhaValida);

    if (!senhaValida) {
      return res.status(401).json({
        error: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        role: usuario.role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return res.json({
      token,
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Erro interno no login",
    });
  }
});

// ROTAS
app.use("/metas", metaRoutes);

app.use("/objetivos", objetivoRoutes);

app.use("/desafios", desafioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
