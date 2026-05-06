import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ROTAS
import metaRoutes from "./routes/meta.routes";
import objetivoRoutes from "./routes/objetivo.routes";

dotenv.config();

const app = express();

// ======================
// MIDDLEWARES
// ======================

app.use(cors());

app.use(express.json());

// ======================
// ROTA TESTE
// ======================

app.get("/", (req, res) => {
  res.send("API PES funcionando 🚀");
});

// ======================
// ROTAS DO SISTEMA
// ======================

app.use("/metas", metaRoutes);

app.use("/objetivos", objetivoRoutes);

// ======================
// START SERVER
// ======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} 🚀`);
});
