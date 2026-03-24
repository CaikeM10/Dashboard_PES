import React, { useState } from "react";
import { Plus, Edit2, Trash2, Target, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { StrategicObjective } from "../../data/mockData";

export default function AdminObjetivos() {
  const { objectives, addObjective, updateObjective, deleteObjective, goals } = useApp();
  const [modal, setModal] = useState<{ open: boolean; obj?: StrategicObjective }>({ open: false });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [period, setPeriod] = useState("2024–2026");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const openNew = () => {
    setTitle("");
    setDescription("");
    setPeriod("2024–2026");
    setModal({ open: true });
  };

  const openEdit = (obj: StrategicObjective) => {
    setTitle(obj.title);
    setDescription(obj.description);
    setPeriod(obj.period);
    setModal({ open: true, obj });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal.obj) {
      updateObjective(modal.obj.id, { title, description, period });
    } else {
      addObjective({ title, description, period });
    }
    setModal({ open: false });
  };

  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      deleteObjective(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-800 text-xl font-bold">Cadastro de Objetivos Estratégicos</h2>
          <p className="text-slate-500 text-sm mt-1">{objectives.length} objetivos cadastrados</p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Novo Objetivo
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-50">
        {objectives.map((obj) => {
          const goalCount = goals.filter((g) => g.objectiveId === obj.id).length;
          return (
            <div key={obj.id} className="p-5 hover:bg-slate-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {obj.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">{obj.title}</h3>
                      <p className="text-sm text-slate-500 mt-0.5 line-clamp-2">{obj.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-400">
                        <span>Período: {obj.period}</span>
                        <span>{goalCount} metas vinculadas</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => openEdit(obj)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(obj.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          confirmDelete === obj.id
                            ? "bg-red-600 text-white"
                            : "text-slate-400 hover:text-red-600 hover:bg-red-50"
                        }`}
                        title={confirmDelete === obj.id ? "Clique novamente para confirmar" : "Excluir"}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {objectives.length === 0 && (
          <div className="py-12 text-center text-slate-400">
            <Target size={32} className="mx-auto mb-2 opacity-30" />
            <p>Nenhum objetivo cadastrado.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">
                {modal.obj ? "Editar Objetivo" : "Novo Objetivo Estratégico"}
              </h3>
              <button onClick={() => setModal({ open: false })} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Ex: Melhoria da Qualidade do Ensino Básico"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Descreva o objetivo estratégico..."
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Período de Execução</label>
                <input
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  placeholder="Ex: 2024–2026"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setModal({ open: false })}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-sm font-medium"
                >
                  {modal.obj ? "Salvar" : "Criar Objetivo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
