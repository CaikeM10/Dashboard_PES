import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Delivery } from "../../data/mockData";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminEntregas() {
  const {
    deliveries,
    challenges,
    objectives,
    addDelivery,
    updateDelivery,
    deleteDelivery,
    currentUser,
  } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<Delivery | null>(null);
  const [formData, setFormData] = useState({
    challengeId: "",
    objectiveId: "",
    title: "",
    description: "",
    deadline: "",
  });

  const isAdmin = currentUser?.role === "admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDelivery) {
      updateDelivery(editingDelivery.id, formData);
    } else {
      addDelivery(formData);
    }
    resetForm();
  };

  const handleEdit = (delivery: Delivery) => {
    setEditingDelivery(delivery);
    setFormData({
      challengeId: delivery.challengeId,
      objectiveId: delivery.objectiveId,
      title: delivery.title,
      description: delivery.description,
      deadline: delivery.deadline,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta entrega?")) {
      deleteDelivery(id);
    }
  };

  const resetForm = () => {
    setFormData({
      challengeId: "",
      objectiveId: "",
      title: "",
      description: "",
      deadline: "",
    });
    setEditingDelivery(null);
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
          <h1 className="text-3xl font-bold text-gray-900">Administração de Entregas</h1>
          <p className="mt-2 text-gray-600">Gerenciar entregas vinculadas aos objetivos</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nova Entrega
        </button>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingDelivery ? "Editar Entrega" : "Nova Entrega"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desafio</label>
                <select
                  value={formData.challengeId}
                  onChange={(e) =>
                    setFormData({ ...formData, challengeId: e.target.value, objectiveId: "" })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Selecione um desafio</option>
                  {challenges.map((challenge) => (
                    <option key={challenge.id} value={challenge.id}>
                      {challenge.number}. {challenge.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
                <select
                  value={formData.objectiveId}
                  onChange={(e) => setFormData({ ...formData, objectiveId: e.target.value })}
                  required
                  disabled={!formData.challengeId}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                >
                  <option value="">Selecione um objetivo</option>
                  {objectives
                    .filter((o) => o.challengeId === formData.challengeId)
                    .map((objective) => (
                      <option key={objective.id} value={objective.id}>
                        {objective.number}. {objective.title}
                      </option>
                    ))}
                </select>
              </div>
            </div>

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
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prazo</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {editingDelivery ? "Atualizar" : "Criar"}
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
        {deliveries.map((delivery) => {
          const challenge = challenges.find((c) => c.id === delivery.challengeId);
          const objective = objectives.find((o) => o.id === delivery.objectiveId);

          return (
            <div key={delivery.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{delivery.title}</h3>
                  <p className="text-gray-700 mb-3">{delivery.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Desafio:</span> {challenge?.title}
                    </div>
                    <div>
                      <span className="font-medium">Objetivo:</span> {objective?.title}
                    </div>
                    <div>
                      <span className="font-medium">Prazo:</span>{" "}
                      {new Date(delivery.deadline).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(delivery)}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Editar"
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(delivery.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
