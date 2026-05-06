import React, { useState } from "react";
import { Plus, CheckSquare } from "lucide-react";
import { useApp } from "../../context/AppContext";
import GoalFormModal from "../../components/GoalFormModal";
import { Goal, getSectorById, getObjectiveById } from "../../data/mockData";

export default function AdminMetas() {
  const { goals } = useApp();
  const [modal, setModal] = useState<{ open: boolean; goal?: Goal }>({ open: false });

  const statusConfig: Record<string, string> = {
    Concluído: "bg-green-100 text-green-700",
    "Em andamento": "bg-blue-100 text-blue-700",
    Atrasado: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Cadastro de Metas</h2>
          <p className="text-slate-500 text-sm mt-1">{goals.length} metas cadastradas</p>
        </div>
        <button
          onClick={() => setModal({ open: true })}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Nova Meta
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase">Meta</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Objetivo</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Setor</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">%</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-slate-500 uppercase">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {goals.map((g) => {
                const obj = getObjectiveById(g.objectiveId);
                const sector = getSectorById(g.sectorId);
                return (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="text-sm text-slate-800 line-clamp-2">{g.description}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-lg">
                        Obj. {obj?.number}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{sector?.name}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm font-semibold text-slate-700">{g.executionPercent}%</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[g.status]}`}>
                        {g.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => setModal({ open: true, goal: g })}
                        className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="md:hidden divide-y divide-slate-100">
          {goals.map((g) => {
            const obj = getObjectiveById(g.objectiveId);
            const sector = getSectorById(g.sectorId);
            return (
              <div key={g.id} className="p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2">{g.description}</p>
                  <p className="text-xs text-slate-400 mt-1">Obj. {obj?.number} • {sector?.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig[g.status]}`}>
                      {g.status}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">{g.executionPercent}%</span>
                  </div>
                </div>
                <button
                  onClick={() => setModal({ open: true, goal: g })}
                  className="flex-shrink-0 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg"
                >
                  Editar
                </button>
              </div>
            );
          })}
        </div>

        {goals.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <CheckSquare size={32} className="mx-auto mb-2 opacity-30" />
            <p>Nenhuma meta cadastrada.</p>
          </div>
        )}
      </div>

      {modal.open && (
        <GoalFormModal
          goal={modal.goal}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
}
