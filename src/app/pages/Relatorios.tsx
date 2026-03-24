import React, { useState } from "react";
import {
  FileText,
  Download,
  Table,
  BarChart2,
  CheckCircle,
  Clock,
  AlertTriangle,
  Printer,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useApp } from "../context/AppContext";
import {
  getObjectiveProgress,
  getOverallProgress,
  getProgressStatus,
  getSectorById,
  getObjectiveById,
} from "../data/mockData";

export default function Relatorios() {
  const { objectives, goals, sectors } = useApp();
  const [generating, setGenerating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"executive" | "detailed">("executive");

  const progressoGeral = getOverallProgress(goals);
  const concluidas = goals.filter((g) => g.status === "Concluído").length;
  const emAndamento = goals.filter((g) => g.status === "Em andamento").length;
  const atrasadas = goals.filter((g) => g.status === "Atrasado").length;

  const objectiveData = objectives.map((obj) => {
    const prog = getObjectiveProgress(obj.id, goals);
    const { label, color } = getProgressStatus(prog);
    return {
      id: obj.id,
      number: obj.number,
      title: obj.title,
      prog,
      label,
      color,
      goalCount: goals.filter((g) => g.objectiveId === obj.id).length,
    };
  });

  const sectorData = sectors
    .map((s) => {
      const sectorGoals = goals.filter((g) => g.sectorId === s.id);
      if (sectorGoals.length === 0) return null;
      const avg =
        sectorGoals.length > 0
          ? Math.round(sectorGoals.reduce((acc, g) => acc + g.executionPercent, 0) / sectorGoals.length)
          : 0;
      return { ...s, avg, count: sectorGoals.length };
    })
    .filter(Boolean) as { id: string; name: string; avg: number; count: number }[];

  const handleSimulateDownload = async (type: string) => {
    setGenerating(type);
    await new Promise((r) => setTimeout(r, 1800));
    setGenerating(null);
    // Simulate print/export action
    if (type === "pdf") {
      window.print();
    } else {
      // Simulate CSV export
      const header = ["Meta", "Objetivo", "Setor", "Prazo", "Execução %", "Status", "Última Atualização"];
      const rows = goals.map((g) => {
        const obj = getObjectiveById(g.objectiveId);
        const sector = getSectorById(g.sectorId);
        return [
          `"${g.description}"`,
          `"${obj?.title || ""}"`,
          `"${sector?.name || ""}"`,
          g.deadline,
          g.executionPercent,
          g.status,
          g.lastUpdate,
        ].join(",");
      });
      const csv = [header.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio_pes.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const barColors: Record<string, string> = {
    green: "#16a34a",
    yellow: "#d97706",
    red: "#dc2626",
  };

  const statusColors: Record<string, string> = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Relatórios</h2>
          <p className="text-slate-500 text-sm mt-1">
            Relatório gerado em{" "}
            {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSimulateDownload("excel")}
            disabled={!!generating}
            className="flex items-center gap-2 border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          >
            {generating === "excel" ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <Table size={15} />
            )}
            Excel / CSV
          </button>
          <button
            onClick={() => handleSimulateDownload("pdf")}
            disabled={!!generating}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
          >
            {generating === "pdf" ? (
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <Printer size={15} />
            )}
            PDF / Imprimir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {[
          { key: "executive", label: "Resumo Executivo" },
          { key: "detailed", label: "Dados Detalhados" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-blue-700 text-blue-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "executive" && (
        <div className="space-y-6">
          {/* Executive Header */}
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-6 text-white print:bg-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={24} className="text-blue-300" />
              <div>
                <h3 className="font-bold">Relatório Executivo — PES 2024–2026</h3>
                <p className="text-blue-300 text-xs">Planejamento Estratégico da Educação</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Progresso Geral", value: `${progressoGeral}%`, color: "text-white" },
                { label: "Objetivos", value: objectives.length, color: "text-blue-200" },
                { label: "Total de Metas", value: goals.length, color: "text-blue-200" },
                { label: "Taxa de Conclusão", value: `${Math.round((concluidas / goals.length) * 100)}%`, color: "text-blue-200" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-blue-300 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Concluídas", value: concluidas, icon: CheckCircle, color: "text-green-700", bg: "bg-green-50 border-green-200" },
              { label: "Em Andamento", value: emAndamento, icon: Clock, color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
              { label: "Atrasadas", value: atrasadas, icon: AlertTriangle, color: "text-red-700", bg: "bg-red-50 border-red-200" },
            ].map((c) => (
              <div key={c.label} className={`${c.bg} border rounded-xl p-5`}>
                <c.icon className={`${c.color} mb-2`} size={20} />
                <div className={`text-3xl font-bold ${c.color}`}>{c.value}</div>
                <div className="text-slate-500 text-sm">Metas {c.label}</div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Progresso por Objetivo Estratégico</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={objectiveData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="number"
                  tickFormatter={(v) => `Obj. ${v}`}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip formatter={(v: number) => [`${v}%`, "Progresso"]} />
                <Bar dataKey="prog" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {objectiveData.map((entry, i) => (
                    <Cell key={i} fill={barColors[entry.color]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Objectives Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h4 className="font-semibold text-slate-800">Status dos Objetivos Estratégicos</h4>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nº</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Objetivo</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Metas</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Progresso</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {objectiveData.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-bold">
                        {o.number}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700 max-w-xs">
                      <p className="line-clamp-2">{o.title}</p>
                    </td>
                    <td className="px-4 py-4 text-center text-sm font-medium text-slate-700">{o.goalCount}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${o.prog}%`, backgroundColor: barColors[o.color] }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-9">{o.prog}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[o.color]}`}>
                        {o.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "detailed" && (
        <div className="space-y-6">
          {/* Sector Analysis */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h4 className="font-semibold text-slate-800 mb-4">Progresso por Setor</h4>
            <div className="space-y-3">
              {sectorData
                .sort((a, b) => b.avg - a.avg)
                .map((s) => {
                  const { color } = getProgressStatus(s.avg);
                  return (
                    <div key={s.id} className="flex items-center gap-3">
                      <div className="text-sm text-slate-700 w-44 flex-shrink-0 truncate">{s.name}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-3">
                        <div
                          className="h-3 rounded-full transition-all"
                          style={{ width: `${s.avg}%`, backgroundColor: barColors[color] }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 w-10 text-right">{s.avg}%</span>
                      <span className="text-xs text-slate-400 w-16 text-right">{s.count} metas</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Full Goals List */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h4 className="font-semibold text-slate-800">Lista Completa de Metas</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Meta</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Objetivo</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Setor</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Prazo</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">%</th>
                    <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {goals.map((g) => {
                    const obj = getObjectiveById(g.objectiveId);
                    const sector = getSectorById(g.sectorId);
                    const sc: Record<string, string> = {
                      Concluído: "bg-green-100 text-green-700",
                      "Em andamento": "bg-blue-100 text-blue-700",
                      Atrasado: "bg-red-100 text-red-700",
                    };
                    return (
                      <tr key={g.id} className="hover:bg-slate-50">
                        <td className="px-5 py-3 text-slate-800 max-w-xs">
                          <p className="line-clamp-2 text-sm">{g.description}</p>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          <span className="text-xs bg-slate-100 px-2 py-1 rounded-lg">Obj. {obj?.number}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-sm">{sector?.name}</td>
                        <td className="px-4 py-3 text-slate-600 text-sm">
                          {new Date(g.deadline + "T00:00:00").toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-slate-700">{g.executionPercent}%</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${sc[g.status]}`}>
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
