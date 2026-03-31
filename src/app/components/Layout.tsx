import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Target,
  CheckSquare,
  Clock,
  FileText,
  Users,
  Building2,
  Settings,
  LogOut,
  Menu,
  X,
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

  // ✅ NOVO ITEM
  {
    path: "/identidade",
    label: "Identidade Organizacional",
    icon: BookOpen,
    roles: ["gestor"], // ✅ AGORA SÓ GESTOR
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
    label: "Atualizções",
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
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel: Record<string, string> = {
    admin: "Administrador",
    responsavel: "Resp. por Setor",
    gestor: "Gestor",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-800">
        <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
          <GraduationCap className="w-5 h-5 text-blue-700" />
        </div>
        {sidebarOpen && (
          <div>
            <div className="text-white font-semibold text-sm leading-tight">
              PES
            </div>
            <div className="text-blue-300 text-xs leading-tight">
              Educação Estratégica
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 space-y-1">
          {navItems
            .filter((item) => item.roles.includes(currentUser?.role ?? ""))
            .map((item) => {
              if (item.children) {
                return (
                  <div key={item.path} className="space-y-1">
                    <div className="flex items-center gap-3 px-3 py-2.5 text-sm text-blue-200">
                      <item.icon size={18} />
                      {sidebarOpen && <span>{item.label}</span>}
                    </div>

                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={({ isActive }) =>
                          `ml-6 flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-white/20 text-white font-medium"
                              : "text-blue-300 hover:bg-white/10 hover:text-white"
                          }`
                        }
                      >
                        {sidebarOpen && <span>{sub.label}</span>}
                      </NavLink>
                    ))}
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 ${
                      isActive
                        ? "bg-white/20 text-white font-medium"
                        : "text-blue-200 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-4.5 h-4.5 flex-shrink-0" size={18} />
                  {sidebarOpen && <span>{item.label}</span>}
                </NavLink>
              );
            })}
        </div>

        {/* Admin Section */}
        {currentUser?.role === "admin" && (
          <div className="mt-4 px-3">
            {sidebarOpen && (
              <button
                onClick={() => setAdminOpen(!adminOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-blue-300 hover:text-white text-xs font-medium uppercase tracking-wider rounded-lg hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2">
                  <Settings size={14} />
                  <span>Administração</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`transition-transform ${adminOpen ? "rotate-180" : ""}`}
                />
              </button>
            )}

            {(adminOpen || !sidebarOpen) && (
              <div className="mt-1 space-y-1">
                {adminItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-white/20 text-white font-medium"
                          : "text-blue-200 hover:bg-white/10 hover:text-white"
                      }`
                    }
                  >
                    <item.icon className="flex-shrink-0" size={16} />
                    {sidebarOpen && <span>{item.label}</span>}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* User */}
      {currentUser && (
        <div className="p-4 border-t border-blue-800">
          <div
            className={`flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}
          >
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {currentUser.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <div className="text-white text-sm font-medium">
                  {currentUser.name}
                </div>
                <div className="text-blue-300 text-xs">
                  {roleLabel[currentUser.role]}
                </div>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                className="text-blue-300 hover:text-white"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50">
      <aside
        className={`hidden lg:flex flex-col bg-blue-900 ${sidebarOpen ? "w-60" : "w-16"}`}
      >
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
