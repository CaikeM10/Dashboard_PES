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
import { ROLES, UserRole } from "../../../types/roles";

const navItems = [
  {
    path: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/identidade",
    label: "Identidade Organizacional",
    icon: BookOpen,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR],
    children: [
      {
        path: "/identidade/missao",
        label: "Missão",
      },
      {
        path: "/identidade/visao",
        label: "Visão",
      },
      {
        path: "/identidade/valores",
        label: "Valores",
      },
    ],
  },

  {
    path: "/desafios",
    label: "Desafios",
    icon: Flag,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/objetivos",
    label: "Objetivos Estratégicos",
    icon: Target,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/entregas",
    label: "Entregas",
    icon: Package,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/metas",
    label: "Metas",
    icon: CheckSquare,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/atualizacoes",
    label: "Atualizações",
    icon: Clock,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR, ROLES.SECRETARIO],
  },

  {
    path: "/relatorios",
    label: "Relatórios",
    icon: FileText,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR],
  },

  {
    path: "/repositorios",
    label: "Repositórios",
    icon: Building2,
    roles: [ROLES.ADMIN, ROLES.COORDENADOR],
  },
];

const adminItems = [
  {
    path: "/admin/usuarios",
    label: "Usuários",
    icon: Users,
  },

  {
    path: "/admin/setores",
    label: "Setores",
    icon: Building2,
  },

  {
    path: "/admin/desafios",
    label: "Cad. Desafios",
    icon: Flag,
  },

  {
    path: "/admin/objetivos",
    label: "Cad. Objetivos",
    icon: BookOpen,
  },

  {
    path: "/admin/entregas",
    label: "Cad. Entregas",
    icon: Package,
  },

  {
    path: "/admin/metas",
    label: "Cad. Metas",
    icon: Target,
  },

  {
    path: "/admin/escolas",
    label: "Escolas",
    icon: School,
  },

  {
    path: "/admin/alunos",
    label: "Alunos",
    icon: UserSquare2,
  },
];

export default function Layout() {
  const { currentUser, logout, isAuthenticated, loadingAuth } = useApp();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const user = currentUser;

  // 🔐 Proteção de rota
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
    ADMIN: "Administrador",
    COORDENADOR: "Coordenador",
    SECRETARIO: "Secretário",
  };

  if (loadingAuth) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <span className="text-slate-500 text-sm">Carregando sistema...</span>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-800">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow">
          <GraduationCap className="w-5 h-5 text-blue-700" />
        </div>

        {sidebarOpen && (
          <div>
            <div className="text-white font-bold text-sm">PES</div>

            <div className="text-blue-300 text-xs">Educação Estratégica</div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto px-3 space-y-1">
        {navItems
          .filter(
            (item) =>
              user?.role && (item.roles as UserRole[]).includes(user.role),
          )
          .map((item) =>
            item.children ? (
              <div key={item.path}>
                <div className="flex items-center gap-3 px-3 py-2 text-blue-200 text-sm">
                  <item.icon size={18} />

                  {sidebarOpen && item.label}
                </div>

                {item.children.map((sub) => (
                  <NavLink
                    key={sub.path}
                    to={sub.path}
                    className={({ isActive }) =>
                      `
                        ml-6 px-3 py-2 block rounded-lg text-sm transition
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "text-blue-300 hover:text-white hover:bg-white/10"
                        }
                      `
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
                  `
                    flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition
                    ${
                      isActive
                        ? "bg-white/20 text-white shadow"
                        : "text-blue-200 hover:text-white hover:bg-white/10"
                    }
                  `
                }
              >
                <item.icon size={18} />

                {sidebarOpen && item.label}
              </NavLink>
            ),
          )}

        {/* ADMINISTRAÇÃO */}
        {user?.role === ROLES.ADMIN && (
          <div className="pt-3">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-blue-300 hover:text-white transition text-sm"
            >
              <span>Administração</span>

              <ChevronDown
                size={15}
                className={`transition-transform ${
                  adminOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {adminOpen && (
              <div className="mt-1 space-y-1">
                {adminItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                        flex items-center gap-3 px-3 py-2 ml-2 rounded-lg text-sm transition
                        ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "text-blue-200 hover:text-white hover:bg-white/10"
                        }
                      `
                    }
                  >
                    <item.icon size={16} />

                    {sidebarOpen && item.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* USUÁRIO */}
      {user && (
        <div className="p-4 border-t border-blue-800 flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold shadow">
            {user.nome?.charAt(0) || "U"}
          </div>

          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm truncate">{user.nome}</div>

              <div className="text-blue-300 text-xs">
                {roleLabel[user.role]}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="text-blue-300 hover:text-white transition"
          >
            <LogOut size={17} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`
          bg-blue-900 transition-all duration-300 shadow-xl
          ${sidebarOpen ? "w-64" : "w-16"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* CONTEÚDO */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="bg-white border-b h-14 flex items-center px-4 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-600 hover:text-slate-900 transition"
          >
            <Menu size={18} />
          </button>

          <h1 className="ml-4 text-sm font-semibold text-slate-800">
            Sistema de Monitoramento Estratégico da Educação
          </h1>
        </header>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
