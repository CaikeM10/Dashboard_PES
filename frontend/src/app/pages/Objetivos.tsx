import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Target, Eye, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import { useApp } from "../context/AppContext";
import { getObjectiveProgress, getProgressStatus } from "../data/mockData";

export default function Objetivos() {
  const { objectives, goals, setGoalFilter } = useApp();
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleVerMetas = (objectiveId: string) => {
    setGoalFilter({ objectiveId });
    navigate("/metas");
  };
  

  const statusConfig: Record<string, { bg: string; text: string; border: string; bar: string }> = {
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
      bar: "bg-green-500",
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
      bar: "bg-yellow-500",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-200",
      bar: "bg-red-500",
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Objetivos Estratégicos</h2>
          <p className="text-slate-500 text-sm mt-1">
            {objectives.length} objetivos cadastrados no plano estratégico
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: "Sucesso (≥ 90%)",
            count: objectives.filter((o) => getObjectiveProgress(o.id, goals) >= 90).length,
            color: "text-green-700",
            bg: "bg-green-50 border-green-200",
          },
          {
            label: "Atenção (70–89%)",
            count: objectives.filter((o) => {
              const p = getObjectiveProgress(o.id, goals);
              return p >= 70 && p < 90;
            }).length,
            color: "text-yellow-700",
            bg: "bg-yellow-50 border-yellow-200",
          },
          {
            label: "Risco (< 70%)",
            count: objectives.filter((o) => getObjectiveProgress(o.id, goals) < 70).length,
            color: "text-red-700",
            bg: "bg-red-50 border-red-200",
          },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} border rounded-xl p-4`}>
            <div className={`text-2xl font-bold ${item.color}`}>{item.count}</div>
            <div className="text-slate-500 text-sm">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16">Nº</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Objetivo Estratégico</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-24">Metas</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-56">Progresso</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider w-28">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {objectives.map((obj) => {
                const prog = getObjectiveProgress(obj.id, goals);
                const { label, color } = getProgressStatus(prog);
                const cfg = statusConfig[color];
                const goalCount = goals.filter((g) => g.objectiveId === obj.id).length;
                return (
                  <tr key={obj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-bold">
                        {obj.number}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-slate-800">{obj.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{obj.description}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Período: {obj.period}</div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-semibold text-slate-700">{goalCount}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-100 rounded-full h-2">
                          <div
                            className={`${cfg.bar} h-2 rounded-full transition-all`}
                            style={{ width: `${prog}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 w-9 text-right">{prog}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text} ${cfg.border} border`}>
                        {label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleVerMetas(obj.id)}
                        className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                      >
                        <Eye size={13} />
                        Ver Metas
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-slate-100">
          {objectives.map((obj) => {
            const prog = getObjectiveProgress(obj.id, goals);
            const { label, color } = getProgressStatus(prog);
            const cfg = statusConfig[color];
            const goalCount = goals.filter((g) => g.objectiveId === obj.id).length;
            const isExpanded = expandedId === obj.id;

            return (
              <div key={obj.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {obj.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-slate-800 line-clamp-2">{obj.title}</p>
                      <button onClick={() => setExpandedId(isExpanded ? null : obj.id)}>
                        {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div
                          className={`${cfg.bar} h-2 rounded-full`}
                          style={{ width: `${prog}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">{prog}%</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
                        {label}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-slate-500">{obj.description}</p>
                        <p className="text-xs text-slate-400">Período: {obj.period} • {goalCount} metas</p>
                        <button
                          onClick={() => handleVerMetas(obj.id)}
                          className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                          <Eye size={13} />
                          Ver Metas
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
