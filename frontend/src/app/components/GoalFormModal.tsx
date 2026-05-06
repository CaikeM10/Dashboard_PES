import React, { useState } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import { Goal, GoalStatus } from "../data/mockData";
import { useApp } from "../context/AppContext";

interface Props {
  goal?: Goal;
  onClose: () => void;
}

export default function GoalFormModal({ goal, onClose }: Props) {
  const { objectives, sectors, addGoal, updateGoal, deleteGoal } = useApp();
  const isEdit = !!goal;

  const [description, setDescription] = useState(goal?.description || "");
  const [objectiveId, setObjectiveId] = useState(goal?.objectiveId || "");
  const [sectorId, setSectorId] = useState(goal?.sectorId || "");
  const [deadline, setDeadline] = useState(goal?.deadline || "");
  const [status, setStatus] = useState<GoalStatus>(goal?.status || "Em andamento");
  const [executionPercent, setExecutionPercent] = useState(goal?.executionPercent || 0);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (isEdit && goal) {
      updateGoal(goal.id, { description, objectiveId, sectorId, deadline, status, executionPercent });
    } else {
      addGoal({ description, objectiveId, sectorId, deadline, status, executionPercent });
    }
    setLoading(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    deleteGoal(goal!.id);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              {isEdit ? <Edit2 className="text-blue-600" size={16} /> : <Plus className="text-blue-600" size={16} />}
            </div>
            <h3 className="font-semibold text-slate-800">{isEdit ? "Editar Meta" : "Nova Meta"}</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição da Meta *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={3}
              placeholder="Descreva a meta de forma clara e mensurável..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Objetivo Estratégico *</label>
            <select
              value={objectiveId}
              onChange={(e) => setObjectiveId(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {objectives.map((o) => (
                <option key={o.id} value={o.id}>
                  Obj. {o.number}: {o.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Setor Responsável *</label>
            <select
              value={sectorId}
              onChange={(e) => setSectorId(e.target.value)}
              required
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione...</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Prazo *</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Em andamento">Em andamento</option>
                <option value="Concluído">Concluído</option>
                <option value="Atrasado">Atrasado</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-medium text-slate-700">Percentual de Execução</label>
              <span className="text-blue-700 font-bold">{executionPercent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={executionPercent}
              onChange={(e) => setExecutionPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-700"
            />
          </div>

          <div className="flex gap-3 pt-2">
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  confirmDelete
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "border border-red-200 text-red-600 hover:bg-red-50"
                }`}
              >
                {confirmDelete ? "Confirmar Exclusão" : "Excluir"}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60"
            >
              {loading ? "Salvando..." : isEdit ? "Salvar" : "Criar Meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
