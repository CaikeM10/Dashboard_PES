import React, { useState } from "react";
import { Plus, Edit2, Trash2, Users, X, Shield, User, Eye, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { User as UserType, UserRole } from "../../data/mockData";

const roleConfig: Record<UserRole, { label: string; color: string; icon: React.ReactNode }> = {
  admin: {
    label: "Administrador",
    color: "bg-purple-100 text-purple-700",
    icon: <Shield size={12} />,
  },
  responsavel: {
    label: "Resp. por Setor",
    color: "bg-blue-100 text-blue-700",
    icon: <User size={12} />,
  },
  gestor: {
    label: "Gestor",
    color: "bg-green-100 text-green-700",
    icon: <Eye size={12} />,
  },
};

interface UserModalProps {
  user?: UserType;
  onClose: () => void;
}

function UserModal({ user, onClose }: UserModalProps) {
  const { sectors, addUser, updateUser, currentUser } = useApp();
  const isEdit = !!user;

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [role, setRole] = useState<UserRole>(user?.role || "gestor");
  const [sectorId, setSectorId] = useState(user?.sectorId || "");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const avatar = initials || "US";
    if (isEdit && user) {
      updateUser(user.id, { name, email, password, role, sectorId: role === "responsavel" ? sectorId : undefined, avatar });
    } else {
      addUser({ name, email, password, role, sectorId: role === "responsavel" ? sectorId : undefined, avatar });
    }
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">{isEdit ? "Editar Usuário" : "Novo Usuário"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome completo *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Nome do usuário"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@pes.edu.br"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Senha *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!isEdit}
                placeholder={isEdit ? "Deixe em branco para manter" : "Senha..."}
                className="w-full border border-slate-200 rounded-lg px-3 pr-10 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Perfil de Acesso *</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.entries(roleConfig) as [UserRole, typeof roleConfig[UserRole]][]).map(([key, cfg]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRole(key)}
                  className={`py-2 px-2 rounded-lg text-xs font-medium border transition-all ${
                    role === key
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>
          {role === "responsavel" && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Setor</label>
              <select
                value={sectorId}
                onChange={(e) => setSectorId(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um setor...</option>
                {sectors.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {loading ? "Salvando..." : isEdit ? "Salvar" : "Criar Usuário"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminUsuarios() {
  const { users, deleteUser, sectors, currentUser } = useApp();
  const [modal, setModal] = useState<{ open: boolean; user?: UserType }>({ open: false });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const getSectorName = (id?: string) => sectors.find((s) => s.id === id)?.name;

  const handleDelete = (id: string) => {
    if (id === currentUser?.id) return;
    if (confirmDelete === id) {
      deleteUser(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Cadastro de Usuários</h2>
          <p className="text-slate-500 text-sm mt-1">{users.length} usuários cadastrados</p>
        </div>
        <button
          onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-50">
        {users.map((u) => {
          const rc = roleConfig[u.role];
          return (
            <div key={u.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {u.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-800">{u.name}</span>
                  {u.id === currentUser?.id && (
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">você</span>
                  )}
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${rc.color}`}>
                    {rc.icon}
                    {rc.label}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {u.email}
                  {u.sectorId && ` • ${getSectorName(u.sectorId)}`}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <button
                  onClick={() => setModal({ open: true, user: u })}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  disabled={u.id === currentUser?.id}
                  className={`p-2 rounded-lg transition-colors ${
                    confirmDelete === u.id
                      ? "bg-red-600 text-white"
                      : u.id === currentUser?.id
                      ? "text-slate-200 cursor-not-allowed"
                      : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                  }`}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
        {users.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <Users size={32} className="mx-auto mb-2 opacity-30" />
            <p>Nenhum usuário cadastrado.</p>
          </div>
        )}
      </div>

      {modal.open && (
        <UserModal user={modal.user} onClose={() => setModal({ open: false })} />
      )}
    </div>
  );
}
