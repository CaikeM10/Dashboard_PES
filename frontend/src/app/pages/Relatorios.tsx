import React, { useState } from "react";
import {
  FileText,
  Table,
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

  // ✅ ADICIONADO
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

import { useApp } from "../context/AppContext";
import {
  getObjectiveProgress,
  getOverallProgress,
  getProgressStatus,
  getSectorById,
  getObjectiveById,
} from "../data/mockData";

import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function Relatorios() {
  const { objectives, goals, sectors } = useApp();
  const [generating, setGenerating] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"executive" | "detailed">(
    "executive",
  );

  const progressoGeral = getOverallProgress(goals);
  const concluidas = goals.filter((g) => g.status === "Concluído").length;
  const emAndamento = goals.filter((g) => g.status === "Em andamento").length;
  const atrasadas = goals.filter((g) => g.status === "Atrasado").length;

  const handleExportWord = async () => {
    setGenerating("word");

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Relatório Estratégico - PES",
                  bold: true,
                  size: 32,
                }),
              ],
            }),

            new Paragraph({ text: "" }),

            new Paragraph({
              children: [new TextRun(`Progresso Geral: ${progressoGeral}%`)],
            }),
            new Paragraph({
              children: [new TextRun(`Metas Concluídas: ${concluidas}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Metas em Andamento: ${emAndamento}`)],
            }),
            new Paragraph({
              children: [new TextRun(`Metas Atrasadas: ${atrasadas}`)],
            }),

            new Paragraph({ text: "" }),

            new Paragraph({
              children: [
                new TextRun({
                  text: "Lista de Metas:",
                  bold: true,
                }),
              ],
            }),

            ...goals.map(
              (g) =>
                new Paragraph({
                  children: [
                    new TextRun(
                      `• ${g.description} - ${g.executionPercent}% (${g.status})`,
                    ),
                  ],
                }),
            ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "relatorio_pes.docx");

    setGenerating(null);
  };

  const handleSimulateDownload = async (type: string) => {
    setGenerating(type);
    await new Promise((r) => setTimeout(r, 1200));
    setGenerating(null);

    if (type === "pdf") {
      window.print();
    } else {
      const header = ["Meta", "Objetivo", "Setor", "Prazo", "%", "Status"];
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
        ].join(",");
      });

      const csv = [header.join(","), ...rows].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "relatorio_pes.csv";
      a.click();

      URL.revokeObjectURL(url);
    }
  };

  const objectiveData = objectives.map((obj) => {
    const prog = getObjectiveProgress(obj.id, goals);
    const { color } = getProgressStatus(prog);
    return {
      number: obj.number,
      prog,
      color,
    };
  });

  const barColors: Record<string, string> = {
    green: "#16a34a",
    yellow: "#d97706",
    red: "#dc2626",
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Relatórios</h2>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => handleSimulateDownload("excel")}
            className="border px-4 py-2 rounded-lg"
          >
            Excel / CSV
          </button>

          <button
            onClick={() => handleSimulateDownload("pdf")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            PDF
          </button>

          <button
            onClick={handleExportWord}
            className="border px-4 py-2 rounded-lg"
          >
            Word
          </button>
        </div>
      </div>

      {/* DASHBOARD RESUMO */}
      <div className="bg-blue-800 text-white p-6 rounded-xl">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <h3 className="text-2xl">{progressoGeral}%</h3>
            <p>Progresso</p>
          </div>
          <div>
            <h3>{objectives.length}</h3>
            <p>Objetivos</p>
          </div>
          <div>
            <h3>{goals.length}</h3>
            <p>Metas</p>
          </div>
          <div>
            <h3>{Math.round((concluidas / goals.length) * 100)}%</h3>
            <p>Conclusão</p>
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded">
          <h3>{concluidas}</h3>
          <p>Concluídas</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3>{emAndamento}</h3>
          <p>Em andamento</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3>{atrasadas}</h3>
          <p>Atrasadas</p>
        </div>
      </div>

      {/* ✅ GRÁFICO ATUALIZADO PARA ARCO */}
      <div className="bg-white p-4 rounded">
        <ResponsiveContainer width="100%" height={260}>
          <RadialBarChart
            innerRadius="30%"
            outerRadius="100%"
            data={objectiveData.map((item) => ({
              ...item,
              value: item.prog,
              fill: barColors[item.color],
            }))}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis domain={[0, 100]} tick={false} />

            <RadialBar dataKey="value" background cornerRadius={10} />

            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
