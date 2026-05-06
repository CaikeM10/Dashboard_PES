import React, { useState } from "react";
import { X, RefreshCw } from "lucide-react";
import { Goal, GoalStatus, getObjectiveById, getSectorById } from "../data/mockData";
import { useApp } from "../context/AppContext";

interface Props {
  goal: Goal;
  onClose: () => void;
}

export default function ProgressUpdateModal({ goal, onClose }: Props) {
  const { updateGoalProgress, currentUser } = useApp();
  const [percent, setPercent] = useState(goal.executionPercent);
  const [status, setStatus] = useState<GoalStatus>(goal.status);
  const [observations, setObservations] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const obj = getObjectiveById(goal.objectiveId);
  const sector = getSectorById(goal.sectorId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    updateGoalProgress(goal.id, currentUser!.id, percent, status, observations);
    setLoading(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1000));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="text-blue-600" size={16} />
            </div>
            <h3 className="font-semibold text-slate-800">Atualizar Progresso</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Goal Info */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
          <p className="text-sm font-medium text-slate-800 mb-1">{goal.description}</p>
          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
            <span>Obj. {obj?.number}: {obj?.title}</span>
            <span>•</span>
            <span>{sector?.name}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${goal.executionPercent}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-600">Atual: {goal.executionPercent}%</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Percent Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">Novo Percentual de Execução</label>
              <span className="text-2xl font-bold text-blue-700">{percent}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={percent}
              onChange={(e) => setPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-700"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          {/* Comparison */}
          <div className="flex items-center gap-4 bg-slate-50 rounded-xl p-3">
            <div className="text-center flex-1">
              <div className="text-xs text-slate-400 mb-1">Anterior</div>
              <div className="text-xl font-bold text-slate-600">{goal.executionPercent}%</div>
            </div>
            <div className="text-slate-300 text-xl">→</div>
            <div className="text-center flex-1">
              <div className="text-xs text-slate-400 mb-1">Novo</div>
              <div className={`text-xl font-bold ${percent > goal.executionPercent ? "text-green-600" : percent < goal.executionPercent ? "text-red-600" : "text-slate-600"}`}>
                {percent}%
              </div>
            </div>
            {percent !== goal.executionPercent && (
              <div className={`text-sm font-medium ${percent > goal.executionPercent ? "text-green-600" : "text-red-600"}`}>
                {percent > goal.executionPercent ? "+" : ""}{percent - goal.executionPercent}%
              </div>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status da Meta</label>
            <div className="grid grid-cols-3 gap-2">
              {(["Em andamento", "Concluído", "Atrasado"] as GoalStatus[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                    status === s
                      ? s === "Concluído"
                        ? "bg-green-600 text-white border-green-600"
                        : s === "Em andamento"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-red-600 text-white border-red-600"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Observações <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Descreva o que foi realizado, dificuldades encontradas, próximos passos..."
              rows={3}
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || success}
              className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {success ? (
                <span className="text-green-300">✓ Salvo!</span>
              ) : loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Salvando...
                </>
              ) : (
                "Salvar Atualização"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
