import React, { useEffect } from "react";
import { createBrowserRouter, Navigate, useNavigate } from "react-router";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Desafios from "./pages/Desafios";
import Objetivos from "./pages/Objetivos";
import Entregas from "./pages/Entregas";
import Metas from "./pages/Metas";
import Atualizacoes from "./pages/Atualizacoes";
import Relatorios from "./pages/Relatorios";
import AdminDesafios from "./pages/admin/AdminDesafios";
import AdminObjetivos from "./pages/admin/AdminObjetivos";
import AdminEntregas from "./pages/admin/AdminEntregas";
import AdminMetas from "./pages/admin/AdminMetas";
import AdminSetores from "./pages/admin/AdminSetores";
import AdminUsuarios from "./pages/admin/AdminUsuarios";
import AdminEscolas from "./pages/admin/AdminEscolas";
import AdminAlunos from "./pages/admin/AdminAlunos";

// ✅ NOVOS IMPORTS
import Missao from "./pages/identidade/Missao";
import Visao from "./pages/identidade/Visao";
import Valores from "./pages/identidade/Valores";

import { useApp } from "./context/AppContext";

function AuthGuard() {
  const { currentUser } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return <Layout />;
}
function RoleGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();

  if (currentUser?.role !== "gestor") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      { index: true, element: <Dashboard /> },

      // ✅ NOVAS ROTAS
      // 🔒 ROTAS PROTEGIDAS (SÓ GESTOR)
      {
        path: "identidade/missao",
        element: (
          <RoleGuard>
            <Missao />
          </RoleGuard>
        ),
      },
      {
        path: "identidade/visao",
        element: (
          <RoleGuard>
            <Visao />
          </RoleGuard>
        ),
      },
      {
        path: "identidade/valores",
        element: (
          <RoleGuard>
            <Valores />
          </RoleGuard>
        ),
      },

      { path: "desafios", element: <Desafios /> },
      { path: "objetivos", element: <Objetivos /> },
      { path: "entregas", element: <Entregas /> },
      { path: "metas", element: <Metas /> },
      { path: "atualizacoes", element: <Atualizacoes /> },
      { path: "relatorios", element: <Relatorios /> },

      { path: "admin/desafios", element: <AdminDesafios /> },
      { path: "admin/objetivos", element: <AdminObjetivos /> },
      { path: "admin/entregas", element: <AdminEntregas /> },
      { path: "admin/metas", element: <AdminMetas /> },
      { path: "admin/setores", element: <AdminSetores /> },
      { path: "admin/usuarios", element: <AdminUsuarios /> },
      { path: "admin/escolas", element: <AdminEscolas /> },
      { path: "admin/alunos", element: <AdminAlunos /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
