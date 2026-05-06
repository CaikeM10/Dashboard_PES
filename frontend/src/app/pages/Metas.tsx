import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Edit2,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  RefreshCw,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import { getMetas } from "../../services/api";
import ProgressUpdateModal from "../components/ProgressUpdateModal";
import GoalFormModal from "../components/GoalFormModal";

// ✅ TIPAGEM FORTE
type Meta = {
  id: string;
  description: string;
  status: "Concluído" | "Em andamento" | "Atrasado";
  executionPercent: number;
  deadline: string;
  lastUpdate: string;
  objectiveId: string;
  deliveryId: string;
  sectorId: string;
  isClosed: boolean;
};

export default function Metas() {
  const { currentUser } = useApp();

  // 🔐 USER CENTRALIZADO (SEM localStorage)
  const user = currentUser;

  const isAdmin = user?.role === "admin";
  const isResponsavel = user?.role === "responsavel";

  // 🔥 STATES
  const [metas, setMetas] = useState<Meta[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [updateModalGoal, setUpdateModalGoal] = useState<Meta | null>(null);
  const [goalFormModal, setGoalFormModal] = useState<{
    open: boolean;
    goal?: Meta;
  }>({ open: false });

  // 🔁 FUNÇÃO REUTILIZÁVEL (REFETCH)
  async function loadMetas() {
    try {
      setLoading(true);
      setError("");

      const data = await getMetas();

      const adaptadas: Meta[] = data.map((m: any) => ({
        id: m.id,
        description: m.descricao,
        status: m.status,
        executionPercent: m.percentual,
        deadline: m.deadline,
        lastUpdate: m.updatedAt,
      }));

      setMetas(adaptadas);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar metas");
    } finally {
      setLoading(false);
    }
  }

  // 🔥 LOAD INICIAL
  useEffect(() => {
    loadMetas();
  }, []);

  // 🔍 FILTRO OTIMIZADO
  const filteredGoals = useMemo(() => {
    return metas.filter((g) => {
      const matchSearch =
        !search || g.description.toLowerCase().includes(search.toLowerCase());

      const matchStatus = !filterStatus || g.status === filterStatus;

      return matchSearch && matchStatus;
    });
  }, [metas, search, filterStatus]);

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("");
  };

  const hasFilters = search || filterStatus;

  // 🎯 STATUS UI
  const statusConfig: Record<string, any> = {
    Concluído: {
      icon: <CheckCircle2 size={13} />,
      bg: "bg-green-100 text-green-700",
      text: "Concluído",
    },
    "Em andamento": {
      icon: <Clock size={13} />,
      bg: "bg-blue-100 text-blue-700",
      text: "Em andamento",
    },
    Atrasado: {
      icon: <AlertTriangle size={13} />,
      bg: "bg-red-100 text-red-700",
      text: "Atrasado",
    },
  };

  // 🔐 PERMISSÕES
  const canEdit = isAdmin;
  const canUpdate = isAdmin || isResponsavel;

  // 🚀 LOADING
  if (loading) {
    return (
      <div className="p-6 text-center text-slate-500">Carregando metas...</div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Metas</h2>
          <p className="text-sm text-slate-500">
            {filteredGoals.length} de {metas.length} metas
          </p>
        </div>

        {/* 🔥 ADMIN */}
        {isAdmin && (
          <button
            onClick={() => setGoalFormModal({ open: true })}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={16} />
            Nova Meta
          </button>
        )}
      </div>

      {/* ERRO */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* BUSCA */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar metas..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm"
          />
        </div>

        {hasFilters && (
          <button onClick={clearFilters} className="text-sm text-blue-600">
            Limpar
          </button>
        )}
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="text-left p-3 text-xs text-slate-500">Meta</th>
              <th className="text-left p-3 text-xs text-slate-500">
                Progresso
              </th>
              <th className="text-center p-3 text-xs text-slate-500">Status</th>
              {(canEdit || canUpdate) && (
                <th className="text-center p-3 text-xs text-slate-500">
                  Ações
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filteredGoals.map((goal) => {
              const sc =
                statusConfig[goal.status] || statusConfig["Em andamento"];

              return (
                <tr key={goal.id} className="border-t hover:bg-slate-50">
                  <td className="p-3 text-sm text-slate-700">
                    {goal.description}
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 h-2 rounded-full">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${goal.executionPercent}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {goal.executionPercent}%
                      </span>
                    </div>
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${sc.bg}`}
                    >
                      {sc.text}
                    </span>
                  </td>

                  {(canEdit || canUpdate) && (
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        {canUpdate && (
                          <button
                            onClick={() => setUpdateModalGoal(goal)}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                          >
                            <RefreshCw size={14} />
                          </button>
                        )}

                        {canEdit && (
                          <button
                            onClick={() =>
                              setGoalFormModal({ open: true, goal })
                            }
                            className="text-slate-600 hover:bg-slate-100 p-1 rounded"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredGoals.length === 0 && (
          <div className="p-10 text-center text-slate-400">
            Nenhuma meta encontrada
          </div>
        )}
      </div>

      {/* MODAIS */}
      {updateModalGoal && (
        <ProgressUpdateModal
          goal={updateModalGoal}
          onClose={() => {
            setUpdateModalGoal(null);
            loadMetas(); // 🔥 refetch automático
          }}
        />
      )}

      {goalFormModal.open && (
        <GoalFormModal
          goal={goalFormModal.goal}
          onClose={() => {
            setGoalFormModal({ open: false });
            loadMetas(); // 🔥 refetch automático
          }}
        />
      )}
    </div>
  );
}
