import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Edit2,
  ChevronDown,
  X,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  RefreshCw,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { Goal, GoalStatus, getSectorById, getObjectiveById } from "../data/mockData";
import ProgressUpdateModal from "../components/ProgressUpdateModal";
import GoalFormModal from "../components/GoalFormModal";

export default function Metas() {
  const { goals, objectives, sectors, currentUser, goalFilter, setGoalFilter } = useApp();

  const [search, setSearch] = useState(goalFilter.search || "");
  const [filterObjective, setFilterObjective] = useState(goalFilter.objectiveId || "");
  const [filterSector, setFilterSector] = useState(goalFilter.sectorId || "");
  const [filterStatus, setFilterStatus] = useState<GoalStatus | "">(goalFilter.status || "");
  const [filterDeadline, setFilterDeadline] = useState(goalFilter.deadline || "");
  const [showFilters, setShowFilters] = useState(false);

  const [updateModalGoal, setUpdateModalGoal] = useState<Goal | null>(null);
  const [goalFormModal, setGoalFormModal] = useState<{ open: boolean; goal?: Goal }>({ open: false });

  // Sync with context filter
  useEffect(() => {
    setFilterObjective(goalFilter.objectiveId || "");
    setFilterSector(goalFilter.sectorId || "");
    setFilterStatus(goalFilter.status || "");
  }, [goalFilter]);

  const filteredGoals = useMemo(() => {
    return goals.filter((g) => {
      const obj = getObjectiveById(g.objectiveId);
      const sector = getSectorById(g.sectorId);
      const matchSearch =
        !search ||
        g.description.toLowerCase().includes(search.toLowerCase()) ||
        obj?.title.toLowerCase().includes(search.toLowerCase()) ||
        sector?.name.toLowerCase().includes(search.toLowerCase());
      const matchObjective = !filterObjective || g.objectiveId === filterObjective;
      const matchSector = !filterSector || g.sectorId === filterSector;
      const matchStatus = !filterStatus || g.status === filterStatus;
      const matchDeadline = !filterDeadline || g.deadline <= filterDeadline;
      return matchSearch && matchObjective && matchSector && matchStatus && matchDeadline;
    });
  }, [goals, search, filterObjective, filterSector, filterStatus, filterDeadline]);

  const clearFilters = () => {
    setSearch("");
    setFilterObjective("");
    setFilterSector("");
    setFilterStatus("");
    setFilterDeadline("");
    setGoalFilter({});
  };

  const hasFilters = search || filterObjective || filterSector || filterStatus || filterDeadline;

  const statusConfig: Record<GoalStatus, { icon: React.ReactNode; bg: string; text: string }> = {
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

  const canEdit = currentUser?.role === "admin" || currentUser?.role === "responsavel";

  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Metas</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {filteredGoals.length} de {goals.length} metas exibidas
          </p>
        </div>
        {currentUser?.role === "admin" && (
          <button
            onClick={() => setGoalFormModal({ open: true })}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />
            Nova Meta
          </button>
        )}
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar metas, objetivos ou setores..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors ${
            hasFilters
              ? "bg-blue-700 text-white border-blue-700"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Filter size={15} />
          <span className="hidden sm:inline">Filtros</span>
          {hasFilters && <span className="bg-white/30 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {[filterObjective, filterSector, filterStatus, filterDeadline].filter(Boolean).length}
          </span>}
        </button>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2.5 text-slate-500 hover:text-slate-700 text-sm transition-colors"
          >
            <X size={15} />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Objetivo Estratégico</label>
            <select
              value={filterObjective}
              onChange={(e) => setFilterObjective(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {objectives.map((o) => (
                <option key={o.id} value={o.id}>
                  Obj. {o.number}: {o.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Setor Responsável</label>
            <select
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as GoalStatus | "")}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Concluído">Concluído</option>
              <option value="Atrasado">Atrasado</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Prazo até</label>
            <input
              type="date"
              value={filterDeadline}
              onChange={(e) => setFilterDeadline(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Active filter badge */}
      {filterObjective && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Filtrando por:</span>
          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5">
            {objectives.find((o) => o.id === filterObjective)?.title}
            <button onClick={() => setFilterObjective("")}><X size={10} /></button>
          </span>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Meta</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Objetivo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Responsável</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Prazo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-40">Progresso</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Atualização</th>
                {canEdit && <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Ação</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredGoals.map((goal) => {
                const obj = getObjectiveById(goal.objectiveId);
                const sector = getSectorById(goal.sectorId);
                const sc = statusConfig[goal.status];
                const isOverdue = new Date(goal.deadline) < new Date() && goal.status !== "Concluído";

                return (
                  <tr key={goal.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-sm text-slate-800 font-medium line-clamp-2">{goal.description}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        Obj. {obj?.number}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-600">{sector?.name}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm ${isOverdue ? "text-red-600 font-medium" : "text-slate-600"}`}>
                        {formatDate(goal.deadline)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              goal.executionPercent >= 90
                                ? "bg-green-500"
                                : goal.executionPercent >= 70
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${goal.executionPercent}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-9 text-right">
                          {goal.executionPercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${sc.bg}`}>
                        {sc.icon}
                        {sc.text}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-slate-400">{formatDate(goal.lastUpdate)}</span>
                    </td>
                    {canEdit && (
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setUpdateModalGoal(goal)}
                            title="Atualizar progresso"
                            className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <RefreshCw size={14} />
                          </button>
                          {currentUser?.role === "admin" && (
                            <button
                              onClick={() => setGoalFormModal({ open: true, goal })}
                              title="Editar meta"
                              className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors"
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
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden divide-y divide-slate-100">
          {filteredGoals.map((goal) => {
            const obj = getObjectiveById(goal.objectiveId);
            const sector = getSectorById(goal.sectorId);
            const sc = statusConfig[goal.status];

            return (
              <div key={goal.id} className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 flex-1">{goal.description}</p>
                  <span className={`flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sc.bg}`}>
                    {sc.text}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        goal.executionPercent >= 90
                          ? "bg-green-500"
                          : goal.executionPercent >= 70
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${goal.executionPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{goal.executionPercent}%</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span>Obj. {obj?.number}</span>
                  <span>{sector?.name}</span>
                  <span>Prazo: {formatDate(goal.deadline)}</span>
                </div>
                {canEdit && (
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setUpdateModalGoal(goal)}
                      className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                    >
                      <RefreshCw size={12} />
                      Atualizar
                    </button>
                    {currentUser?.role === "admin" && (
                      <button
                        onClick={() => setGoalFormModal({ open: true, goal })}
                        className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium"
                      >
                        <Edit2 size={12} />
                        Editar
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredGoals.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-slate-300 text-5xl mb-4">🔍</div>
            <p className="text-slate-500 font-medium">Nenhuma meta encontrada</p>
            <p className="text-slate-400 text-sm mt-1">Tente ajustar os filtros ou o termo de busca.</p>
            <button onClick={clearFilters} className="mt-4 text-blue-600 text-sm hover:underline">
              Limpar filtros
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {updateModalGoal && (
        <ProgressUpdateModal
          goal={updateModalGoal}
          onClose={() => setUpdateModalGoal(null)}
        />
      )}
      {goalFormModal.open && (
        <GoalFormModal
          goal={goalFormModal.goal}
          onClose={() => setGoalFormModal({ open: false })}
        />
      )}
    </div>
  );
}
