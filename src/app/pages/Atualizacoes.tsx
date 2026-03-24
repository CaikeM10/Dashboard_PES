import React, { useState, useMemo } from "react";
import {
  Search,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../context/AppContext";
import { getGoalById, getObjectiveById, getSectorById, getUserById } from "../data/mockData";

// Mock monthly evolution data for key goals
const monthlyEvolution = [
  { mes: "Out/25", m1: 40, m2: 55, m5: 45, m8: 60, m13: 65 },
  { mes: "Nov/25", m1: 48, m2: 62, m5: 52, m8: 67, m13: 72 },
  { mes: "Dez/25", m1: 55, m2: 68, m5: 60, m8: 75, m13: 80 },
  { mes: "Jan/26", m1: 57, m2: 72, m5: 65, m8: 78, m13: 84 },
  { mes: "Fev/26", m1: 62, m2: 78, m5: 71, m8: 83, m13: 88 },
];

const timelineGoals = [
  { key: "m1", label: "IDEB Ens. Fundamental", color: "#2563eb" },
  { key: "m2", label: "Reforço Escolar", color: "#16a34a" },
  { key: "m5", label: "Capacitação Professores", color: "#d97706" },
  { key: "m8", label: "Atend. Especializado", color: "#7c3aed" },
  { key: "m13", label: "Internet nas Escolas", color: "#0891b2" },
];

const CustomTimelineTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-xs min-w-[180px]">
        <p className="font-semibold text-slate-700 mb-2 border-b border-slate-100 pb-1">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-3 py-0.5">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-slate-600 truncate max-w-[110px]">{p.name}</span>
            </div>
            <span className="font-bold text-slate-800">{p.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Atualizacoes() {
  const { progressUpdates, goals, objectives } = useApp();
  const [search, setSearch] = useState("");
  const [filterObjective, setFilterObjective] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [showTimeline, setShowTimeline] = useState(true);

  const enriched = useMemo(() => {
    return progressUpdates
      .map((u) => {
        const goal = getGoalById(u.goalId) || goals.find((g) => g.id === u.goalId);
        const obj = goal ? getObjectiveById(goal.objectiveId) : undefined;
        const sector = goal ? getSectorById(goal.sectorId) : undefined;
        const user = getUserById(u.userId);
        return { ...u, goal, obj, sector, user };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [progressUpdates, goals]);

  const filtered = useMemo(() => {
    return enriched.filter((u) => {
      const matchSearch =
        !search ||
        u.goal?.description.toLowerCase().includes(search.toLowerCase()) ||
        u.observations.toLowerCase().includes(search.toLowerCase()) ||
        u.user?.name.toLowerCase().includes(search.toLowerCase());
      const matchObj = !filterObjective || u.obj?.id === filterObjective;
      return matchSearch && matchObj;
    });
  }, [enriched, search, filterObjective]);

  const visible = filtered.slice(0, visibleCount);

  const formatDate = (d: string) =>
    new Date(d + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const getChangeIcon = (prev: number, next: number) => {
    if (next > prev) return <TrendingUp size={14} className="text-green-500" />;
    if (next < prev) return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-slate-400" />;
  };

  const getChangeBadge = (prev: number, next: number) => {
    const diff = next - prev;
    if (diff > 0) return <span className="text-green-600 font-semibold">+{diff}%</span>;
    if (diff < 0) return <span className="text-red-600 font-semibold">{diff}%</span>;
    return <span className="text-slate-400">sem alteração</span>;
  };

  const statusColors: Record<string, string> = {
    Concluído: "bg-green-100 text-green-700",
    "Em andamento": "bg-blue-100 text-blue-700",
    Atrasado: "bg-red-100 text-red-700",
  };

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof visible> = {};
    visible.forEach((u) => {
      if (!groups[u.date]) groups[u.date] = [];
      groups[u.date].push(u);
    });
    return Object.entries(groups).sort(([a], [b]) => (a < b ? 1 : -1));
  }, [visible]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-800 text-xl font-bold">Histórico de Atualizações</h2>
        <p className="text-slate-500 text-sm mt-1">
          {progressUpdates.length} registros de atualização — linha do tempo de progresso
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total de registros",
            value: progressUpdates.length,
            color: "text-slate-700",
            bg: "bg-slate-50 border-slate-200",
          },
          {
            label: "Melhorias registradas",
            value: progressUpdates.filter((u) => u.newPercent > u.previousPercent).length,
            color: "text-green-700",
            bg: "bg-green-50 border-green-200",
          },
          {
            label: "Metas concluídas",
            value: progressUpdates.filter((u) => u.status === "Concluído").length,
            color: "text-blue-700",
            bg: "bg-blue-50 border-blue-200",
          },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} border rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-slate-500 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Timeline Chart */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <LineChartIcon className="text-blue-600" size={18} />
            <div>
              <h3 className="text-slate-800 font-semibold">Timeline de Execução</h3>
              <p className="text-slate-400 text-xs">Evolução do progresso das principais metas — Out/25 a Fev/26</p>
            </div>
          </div>
          <button
            onClick={() => setShowTimeline(!showTimeline)}
            className="text-slate-400 hover:text-slate-600 text-xs flex items-center gap-1 transition-colors"
          >
            {showTimeline ? "Ocultar" : "Mostrar"}
            <ChevronDown size={14} className={`transition-transform ${showTimeline ? "rotate-180" : ""}`} />
          </button>
        </div>

        {showTimeline && (
          <div className="p-6">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart
                data={monthlyEvolution}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTimelineTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                  iconType="circle"
                  iconSize={8}
                />
                {timelineGoals.map((g) => (
                  <Line
                    key={g.key}
                    type="monotone"
                    dataKey={g.key}
                    name={g.label}
                    stroke={g.color}
                    strokeWidth={2}
                    dot={{ r: 4, fill: g.color, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            {/* Progress summary badges */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
              {timelineGoals.map((g) => {
                const first = monthlyEvolution[0][g.key as keyof typeof monthlyEvolution[0]] as number;
                const last = monthlyEvolution[monthlyEvolution.length - 1][g.key as keyof typeof monthlyEvolution[0]] as number;
                const delta = last - first;
                return (
                  <div
                    key={g.key}
                    className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5"
                  >
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: g.color }} />
                    <span className="text-xs text-slate-600 truncate max-w-[100px]">{g.label}</span>
                    <span className="text-xs font-bold text-slate-800">{last}%</span>
                    <span className="text-xs text-green-600 font-semibold">+{delta}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por meta, responsável ou observação..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={filterObjective}
          onChange={(e) => setFilterObjective(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todos os objetivos</option>
          {objectives.map((o) => (
            <option key={o.id} value={o.id}>
              Obj. {o.number}
            </option>
          ))}
        </select>
      </div>

      {/* Timeline list */}
      <div className="space-y-8">
        {groupedByDate.map(([date, updates]) => (
          <div key={date}>
            {/* Date label */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-blue-700 rounded-full flex-shrink-0" />
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-500 bg-white px-2 flex-shrink-0">
                {formatDate(date)}
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="space-y-4 ml-1">
              {updates.map((u) => (
                <div key={u.id} className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center pt-1 flex-shrink-0">
                    <div className="w-2 h-2 bg-blue-300 rounded-full" />
                    <div className="w-px flex-1 bg-slate-100 mt-1" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 mb-2 hover:shadow-md transition-shadow">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-800 mb-0.5 line-clamp-2">
                          {u.goal?.description || "Meta removida"}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400">
                          {u.obj && <span>Obj. {u.obj.number}: {u.obj.title}</span>}
                          {u.sector && <span>• {u.sector.name}</span>}
                        </div>
                      </div>
                      <span className={`flex-shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.status] || "bg-slate-100 text-slate-600"}`}>
                        {u.status}
                      </span>
                    </div>

                    {/* Progress change */}
                    <div className="flex items-center gap-4 bg-slate-50 rounded-lg p-3 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-slate-400 mb-0.5">Anterior</div>
                        <div className="text-lg font-bold text-slate-500">{u.previousPercent}%</div>
                      </div>
                      <div className="flex items-center gap-1 text-slate-400">
                        {getChangeIcon(u.previousPercent, u.newPercent)}
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-400 mb-0.5">Novo</div>
                        <div className="text-lg font-bold text-slate-800">{u.newPercent}%</div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${u.newPercent}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-sm">{getChangeBadge(u.previousPercent, u.newPercent)}</div>
                    </div>

                    {/* Observations */}
                    {u.observations && (
                      <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 mb-3">
                        <p className="text-xs text-amber-800 leading-relaxed">{u.observations}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">
                        {u.user?.avatar || "?"}
                      </div>
                      <span>{u.user?.name || "Usuário"}</span>
                      <span>•</span>
                      <Clock size={11} />
                      <span>{formatDate(u.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {filtered.length > visibleCount && (
        <div className="text-center">
          <button
            onClick={() => setVisibleCount((n) => n + 10)}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <ChevronDown size={16} />
            Carregar mais ({filtered.length - visibleCount} restantes)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="py-16 text-center text-slate-400">
          <Clock size={40} className="mx-auto mb-3 opacity-30" />
          <p>Nenhuma atualização encontrada.</p>
        </div>
      )}
    </div>
  );
}