import React from "react";
import { useApp } from "../context/AppContext";
import { getObjectiveProgress } from "../data/mockData";

export default function Desafios() {
  const { challenges, objectives, goals } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Desafios Estratégicos</h1>
        <p className="mt-2 text-gray-600">
          Visão geral dos desafios estratégicos do Planejamento Educacional
        </p>
      </div>

      <div className="grid gap-6">
        {challenges.map((challenge) => {
          const challengeObjectives = objectives.filter((o) => o.challengeId === challenge.id);
          const averageProgress =
            challengeObjectives.length > 0
              ? Math.round(
                  challengeObjectives.reduce(
                    (sum, obj) => sum + getObjectiveProgress(obj.id, goals),
                    0
                  ) / challengeObjectives.length
                )
              : 0;

          return (
            <div
              key={challenge.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-100 text-indigo-700 font-bold">
                      {challenge.number}
                    </span>
                    <h2 className="text-xl font-semibold text-gray-900">{challenge.title}</h2>
                  </div>
                  <p className="text-sm text-gray-600 ml-13">{challenge.period}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{averageProgress}%</div>
                  <div className="text-xs text-gray-500">Progresso Médio</div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{challenge.description}</p>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Objetivos Vinculados:</h3>
                {challengeObjectives.length > 0 ? (
                  <div className="grid gap-3">
                    {challengeObjectives.map((objective) => {
                      const progress = getObjectiveProgress(objective.id, goals);
                      const statusColors = {
                        green: "bg-green-100 border-green-300 text-green-800",
                        yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
                        red: "bg-red-100 border-red-300 text-red-800",
                      };

                      return (
                        <div
                          key={objective.id}
                          className={`border rounded-lg p-4 ${statusColors[objective.statusColor]}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">Objetivo {objective.number}</span>
                                <span className="text-sm">•</span>
                                <span className="text-sm">{objective.title}</span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-lg font-bold">{progress}%</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Nenhum objetivo vinculado a este desafio.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
