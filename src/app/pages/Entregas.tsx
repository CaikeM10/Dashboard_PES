import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Entregas() {
  const { deliveries, objectives, challenges, goals } = useApp();
  const [selectedChallenge, setSelectedChallenge] = useState<string>("");
  const [selectedObjective, setSelectedObjective] = useState<string>("");

  const filteredDeliveries = deliveries.filter((delivery) => {
    if (selectedChallenge && delivery.challengeId !== selectedChallenge) return false;
    if (selectedObjective && delivery.objectiveId !== selectedObjective) return false;
    return true;
  });

  const getDeliveryGoals = (deliveryId: string) => {
    return goals.filter((g) => g.deliveryId === deliveryId);
  };

  const getDeliveryProgress = (deliveryId: string) => {
    const deliveryGoals = getDeliveryGoals(deliveryId);
    if (deliveryGoals.length === 0) return 0;
    const sum = deliveryGoals.reduce((acc, g) => acc + g.executionPercent, 0);
    return Math.round(sum / deliveryGoals.length);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Entregas</h1>
        <p className="mt-2 text-gray-600">
          Acompanhamento das entregas vinculadas aos objetivos estratégicos
        </p>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Desafio
            </label>
            <select
              value={selectedChallenge}
              onChange={(e) => {
                setSelectedChallenge(e.target.value);
                setSelectedObjective("");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos os desafios</option>
              {challenges.map((challenge) => (
                <option key={challenge.id} value={challenge.id}>
                  {challenge.number}. {challenge.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtrar por Objetivo
            </label>
            <select
              value={selectedObjective}
              onChange={(e) => setSelectedObjective(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Todos os objetivos</option>
              {objectives
                .filter((o) => !selectedChallenge || o.challengeId === selectedChallenge)
                .map((objective) => (
                  <option key={objective.id} value={objective.id}>
                    {objective.number}. {objective.title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Entregas */}
      <div className="grid gap-4">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map((delivery) => {
            const objective = objectives.find((o) => o.id === delivery.objectiveId);
            const challenge = challenges.find((c) => c.id === delivery.challengeId);
            const deliveryGoals = getDeliveryGoals(delivery.id);
            const progress = getDeliveryProgress(delivery.id);

            const statusColor =
              progress >= 90
                ? "bg-green-50 border-green-200"
                : progress >= 70
                ? "bg-yellow-50 border-yellow-200"
                : "bg-red-50 border-red-200";

            return (
              <div
                key={delivery.id}
                className={`border rounded-lg p-5 ${statusColor} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{delivery.title}</h3>
                    <p className="text-sm text-gray-600">{delivery.description}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-indigo-600">{progress}%</div>
                    <div className="text-xs text-gray-500">Progresso</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                  <div>
                    <span className="font-medium">Desafio:</span> {challenge?.title}
                  </div>
                  <div>
                    <span className="font-medium">Objetivo:</span> {objective?.title}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Prazo:</span>{" "}
                    <span className="text-gray-900">
                      {new Date(delivery.deadline).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Metas vinculadas:</span>{" "}
                    <span className="text-gray-900">{deliveryGoals.length}</span>
                  </div>
                </div>

                {/* Metas vinculadas */}
                {deliveryGoals.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Metas vinculadas:</h4>
                    <div className="space-y-2">
                      {deliveryGoals.map((goal) => (
                        <div
                          key={goal.id}
                          className="flex items-center justify-between p-2 bg-white rounded border border-gray-200"
                        >
                          <span className="text-sm text-gray-700">{goal.description}</span>
                          <span className="text-sm font-semibold text-indigo-600">
                            {goal.executionPercent}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">Nenhuma entrega encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
