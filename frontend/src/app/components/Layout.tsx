import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  Clock,
  FileText,
  Users,
  Building2,
  LogOut,
  Menu,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Flag,
  Package,
  School,
  UserSquare2,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/identidade",
    label: "Identidade Organizacional",
    icon: BookOpen,
    roles: ["gestor"],
    children: [
      { path: "/identidade/missao", label: "Missão" },
      { path: "/identidade/visao", label: "Visão" },
      { path: "/identidade/valores", label: "Valores" },
    ],
  },
  {
    path: "/desafios",
    label: "Desafios",
    icon: Flag,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/objetivos",
    label: "Objetivos Estratégicos",
    icon: Target,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/entregas",
    label: "Entregas",
    icon: Package,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/metas",
    label: "Metas",
    icon: CheckSquare,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/atualizacoes",
    label: "Atualizações",
    icon: Clock,
    roles: ["admin", "responsavel", "gestor"],
  },
  {
    path: "/relatorios",
    label: "Relatórios",
    icon: FileText,
    roles: ["admin", "gestor"],
  },
];

const adminItems = [
  { path: "/admin/usuarios", label: "Usuários", icon: Users },
  { path: "/admin/setores", label: "Setores", icon: Building2 },
  { path: "/admin/desafios", label: "Cad. Desafios", icon: Flag },
  { path: "/admin/objetivos", label: "Cad. Objetivos", icon: BookOpen },
  { path: "/admin/entregas", label: "Cad. Entregas", icon: Package },
  { path: "/admin/metas", label: "Cad. Metas", icon: Target },
  { path: "/admin/escolas", label: "Escolas", icon: School },
  { path: "/admin/alunos", label: "Alunos", icon: UserSquare2 },
];

export default function Layout() {
  const { currentUser, logout, isAuthenticated, loadingAuth } = useApp();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const user = currentUser;

  // 🔐 Proteção real baseada no context
  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loadingAuth, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel: Record<string, string> = {
    admin: "Administrador",
    responsavel: "Responsável",
    gestor: "Gestor",
  };

  if (loadingAuth) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="text-slate-500">Carregando...</span>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-800">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-blue-700" />
        </div>
        {sidebarOpen && (
          <div>
            <div className="text-white font-semibold text-sm">PES</div>
            <div className="text-blue-300 text-xs">Educação Estratégica</div>
          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
        {navItems
          .filter((item) => item.roles.includes(user?.role ?? ""))
          .map((item) =>
            item.children ? (
              <div key={item.path}>
                <div className="flex items-center gap-3 px-3 py-2 text-blue-200">
                  <item.icon size={18} />
                  {sidebarOpen && item.label}
                </div>
                {item.children.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    className={({ isActive }) =>
                      `ml-6 px-3 py-2 block rounded ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "text-blue-300 hover:text-white"
                      }`
                    }
                  >
                    {sub.label}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "text-blue-200 hover:text-white"
                  }`
                }
              >
                <item.icon size={18} />
                {sidebarOpen && item.label}
              </NavLink>
            ),
          )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <div>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="w-full flex justify-between px-3 py-2 text-blue-300"
            >
              Administração
              <ChevronDown size={14} />
            </button>

            {adminOpen &&
              adminItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-2 text-blue-200 hover:text-white"
                >
                  {item.label}
                </NavLink>
              ))}
          </div>
        )}
      </nav>

      {/* USER */}
      {user && (
        <div className="p-4 border-t border-blue-800 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {user.nome?.charAt(0) || "U"}
          </div>

          {sidebarOpen && (
            <div className="flex-1">
              <div className="text-white text-sm">{user.nome}</div>
              <div className="text-blue-300 text-xs">
                {roleLabel[user.role]}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-blue-300 hover:text-white"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className={`bg-blue-900 ${sidebarOpen ? "w-60" : "w-16"}`}>
        <SidebarContent />
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b h-14 flex items-center px-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={18} />
          </button>
          <h1 className="ml-4 text-sm font-semibold">
            Sistema de Monitoramento Estratégico da Educação
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
