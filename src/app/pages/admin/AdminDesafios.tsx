import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Challenge } from "../../data/mockData";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminDesafios() {
  const { challenges, addChallenge, updateChallenge, deleteChallenge, currentUser } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    period: "",
  });

  const isAdmin = currentUser?.role === "admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChallenge) {
      updateChallenge(editingChallenge.id, formData);
    } else {
      addChallenge(formData);
    }
    resetForm();
  };

  const handleEdit = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      title: challenge.title,
      description: challenge.description,
      period: challenge.period,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este desafio?")) {
      deleteChallenge(id);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", period: "" });
    setEditingChallenge(null);
    setIsFormOpen(false);
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Você não tem permissão para acessar esta página.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administração de Desafios</h1>
          <p className="mt-2 text-gray-600">Gerenciar desafios estratégicos do planejamento</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novo Desafio
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingChallenge ? "Editar Desafio" : "Novo Desafio"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Período</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                required
                placeholder="Ex: 2024-2026"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingChallenge ? "Atualizar" : "Criar"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid gap-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 font-bold">
                    {challenge.number}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900">{challenge.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2 ml-13">{challenge.period}</p>
                <p className="text-gray-700 ml-13">{challenge.description}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(challenge)}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(challenge.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
