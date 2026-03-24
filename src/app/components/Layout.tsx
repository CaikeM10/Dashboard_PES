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
  { path: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["admin", "responsavel", "gestor"] },
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
  { path: "/metas", label: "Metas", icon: CheckSquare, roles: ["admin", "responsavel", "gestor"] },
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
            <div className="text-white font-semibold text-sm leading-tight">PES</div>
            <div className="text-blue-300 text-xs leading-tight">Educação Estratégica</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="px-3 space-y-1">
          {navItems
            .filter((item) => item.roles.includes(currentUser?.role ?? ""))
            .map((item) => (
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
            ))}
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

      {/* User info */}
      {currentUser && (
        <div className="p-4 border-t border-blue-800">
          <div className={`flex items-center gap-3 ${sidebarOpen ? "" : "justify-center"}`}>
            <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {currentUser.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">{currentUser.name}</div>
                <div className="text-blue-300 text-xs">{roleLabel[currentUser.role]}</div>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                title="Sair"
                className="text-blue-300 hover:text-white transition-colors"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
          {!sidebarOpen && (
            <button
              onClick={handleLogout}
              title="Sair"
              className="mt-2 w-full flex justify-center text-blue-300 hover:text-white transition-colors"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-blue-900 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        } flex-shrink-0`}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-blue-900 h-full z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-14 flex items-center px-4 gap-4 flex-shrink-0">
          <button
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileSidebarOpen(!mobileSidebarOpen);
              } else {
                setSidebarOpen(!sidebarOpen);
              }
            }}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            {mobileSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div className="flex-1">
            <h1 className="text-slate-800 font-semibold text-sm">
              Sistema de Monitoramento Estratégico da Educação
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-600">Dados atualizados</span>
            </div>
            <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {currentUser?.avatar}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}