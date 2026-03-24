import React from "react";
import { useNavigate } from "react-router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import {
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingDown,
  ArrowRight,
  Map,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import { getObjectiveProgress, getOverallProgress, getProgressStatus } from "../data/mockData";

// ---- Strategic Map Component ----
function MapaEstrategico() {
  const { objectives, goals } = useApp();
  const navigate = useNavigate();
  const { setGoalFilter } = useApp();

  const blocks = objectives.map((obj) => {
    const prog = getObjectiveProgress(obj.id, goals);
    const { label, color } = getProgressStatus(prog);
    return { ...obj, prog, label, color };
  });

  const colorMap: Record<string, { border: string; bg: string; badge: string; text: string; bar: string; dot: string }> = {
    green: {
      border: "border-green-400",
      bg: "bg-green-50",
      badge: "bg-green-100 text-green-800",
      text: "text-green-700",
      bar: "bg-green-500",
      dot: "bg-green-400",
    },
    yellow: {
      border: "border-yellow-400",
      bg: "bg-yellow-50",
      badge: "bg-yellow-100 text-yellow-800",
      text: "text-yellow-700",
      bar: "bg-yellow-500",
      dot: "bg-yellow-400",
    },
    red: {
      border: "border-red-400",
      bg: "bg-red-50",
      badge: "bg-red-100 text-red-800",
      text: "text-red-700",
      bar: "bg-red-500",
      dot: "bg-red-400",
    },
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center gap-2 mb-2">
        <Map className="text-blue-600" size={18} />
        <h3 className="text-slate-800 font-semibold">Mapa Estratégico do Plano</h3>
      </div>
      <p className="text-slate-400 text-xs mb-6">
        Relação de causa e efeito entre os objetivos estratégicos — clique em um bloco para ver as metas
      </p>

      {/* Desktop: horizontal flow */}
      <div className="hidden md:flex items-stretch gap-0 overflow-x-auto pb-2">
        {blocks.map((obj, idx) => {
          const cfg = colorMap[obj.color];
          return (
            <React.Fragment key={obj.id}>
              <button
                onClick={() => { setGoalFilter({ objectiveId: obj.id }); navigate("/metas"); }}
                className={`flex-1 min-w-[160px] max-w-[220px] border-2 ${cfg.border} ${cfg.bg} rounded-xl p-4 text-left hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group flex flex-col`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200 flex-shrink-0 shadow-sm">
                    {obj.number}
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
                    {obj.label}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-700 mb-3 line-clamp-3 flex-1 group-hover:text-blue-700 transition-colors">
                  {obj.title}
                </p>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Execução</span>
                    <span className={`text-sm font-bold ${cfg.text}`}>{obj.prog}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-1.5 border border-slate-200">
                    <div className={`${cfg.bar} h-1.5 rounded-full transition-all duration-700`} style={{ width: `${obj.prog}%` }} />
                  </div>
                </div>
              </button>

              {/* Arrow connector */}
              {idx < blocks.length - 1 && (
                <div className="flex items-center flex-shrink-0 px-1">
                  <div className="flex flex-col items-center">
                    <div className="h-px w-6 bg-slate-300" />
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-slate-400 -ml-1">
                      <path d="M0 6 L8 2 L8 10 Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile: vertical flow */}
      <div className="md:hidden space-y-3">
        {blocks.map((obj, idx) => {
          const cfg = colorMap[obj.color];
          return (
            <React.Fragment key={obj.id}>
              <button
                onClick={() => { setGoalFilter({ objectiveId: obj.id }); navigate("/metas"); }}
                className={`w-full border-2 ${cfg.border} ${cfg.bg} rounded-xl p-4 text-left hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-xs font-bold text-slate-700 border border-slate-200">
                      {obj.number}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{obj.title}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>{obj.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full h-2 border border-slate-200">
                    <div className={`${cfg.bar} h-2 rounded-full`} style={{ width: `${obj.prog}%` }} />
                  </div>
                  <span className={`text-sm font-bold ${cfg.text}`}>{obj.prog}%</span>
                </div>
              </button>
              {idx < blocks.length - 1 && (
                <div className="flex justify-center">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-3 bg-slate-300" />
                    <svg width="10" height="10" viewBox="0 0 10 10" className="text-slate-400">
                      <path d="M5 10 L1 2 L9 2 Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-slate-100">
        {[
          { color: "#16a34a", label: "Sucesso (≥ 90%)" },
          { color: "#d97706", label: "Atenção (70–89%)" },
          { color: "#dc2626", label: "Risco (< 70%)" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { objectives, goals, setGoalFilter } = useApp();
  const navigate = useNavigate();

  const totalMetas = goals.length;
  const concluidas = goals.filter((g) => g.status === "Concluído").length;
  const emAndamento = goals.filter((g) => g.status === "Em andamento").length;
  const atrasadas = goals.filter((g) => g.status === "Atrasado").length;
  const progressoGeral = getOverallProgress(goals);

  const handleCardClick = (status?: string) => {
    if (!status) {
      setGoalFilter({});
    } else {
      setGoalFilter({ status: status as any });
    }
    navigate("/metas");
  };

  const handleObjectiveBarClick = (data: any) => {
    if (data && data.activePayload) {
      const payload = data.activePayload[0]?.payload;
      if (payload) {
        setGoalFilter({ objectiveId: payload.id });
        navigate("/metas");
      }
    }
  };

  const objectiveChartData = objectives.map((obj) => {
    const prog = getObjectiveProgress(obj.id, goals);
    const status = getProgressStatus(prog);
    return {
      id: obj.id,
      name: `Obj. ${obj.number}`,
      fullName: obj.title,
      progresso: prog,
      color:
        status.color === "green"
          ? "#16a34a"
          : status.color === "yellow"
          ? "#d97706"
          : "#dc2626",
    };
  });

  // Radar chart data
  const radarData = objectives.map((obj) => ({
    subject: `Obj. ${obj.number}`,
    fullName: obj.title,
    value: getObjectiveProgress(obj.id, goals),
    fullMark: 100,
  }));

  const pieData = [
    { name: "Concluídas", value: concluidas, fill: "#16a34a" },
    { name: "Em Andamento", value: emAndamento, fill: "#2563eb" },
    { name: "Atrasadas", value: atrasadas, fill: "#dc2626" },
  ];

  const atencaoObjetivos = [...objectives]
    .map((obj) => ({
      ...obj,
      progress: getObjectiveProgress(obj.id, goals),
    }))
    .sort((a, b) => a.progress - b.progress)
    .slice(0, 3);

  const cards = [
    {
      label: "Total de Metas",
      value: totalMetas,
      icon: Target,
      color: "bg-slate-700",
      textColor: "text-slate-700",
      bgLight: "bg-slate-50 hover:bg-slate-100",
      border: "border-slate-200",
      filter: undefined,
    },
    {
      label: "Concluídas",
      value: concluidas,
      icon: CheckCircle2,
      color: "bg-green-600",
      textColor: "text-green-700",
      bgLight: "bg-green-50 hover:bg-green-100",
      border: "border-green-200",
      filter: "Concluído",
    },
    {
      label: "Em Andamento",
      value: emAndamento,
      icon: Clock,
      color: "bg-blue-600",
      textColor: "text-blue-700",
      bgLight: "bg-blue-50 hover:bg-blue-100",
      border: "border-blue-200",
      filter: "Em andamento",
    },
    {
      label: "Atrasadas",
      value: atrasadas,
      icon: AlertTriangle,
      color: "bg-red-600",
      textColor: "text-red-700",
      bgLight: "bg-red-50 hover:bg-red-100",
      border: "border-red-200",
      filter: "Atrasado",
    },
  ];

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs max-w-48">
          <p className="font-semibold text-slate-800 mb-1">{d.fullName}</p>
          <p className="text-slate-600">
            Progresso: <span className="font-bold text-slate-800">{d.progresso}%</span>
          </p>
          <p className="text-blue-600 mt-1 flex items-center gap-1">
            <ArrowRight size={10} /> Clique para ver metas
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomRadarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 text-xs max-w-52">
          <p className="font-semibold text-slate-800 mb-1">{d.fullName}</p>
          <p className="text-slate-600">
            Progresso: <span className="font-bold text-blue-700">{d.value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-slate-800 text-xl font-bold">Dashboard Estratégico</h2>
        <p className="text-slate-500 text-sm mt-1">
          Monitoramento do Planejamento Estratégico da Educação — Atualizado em{" "}
          {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
        </p>
      </div>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-6 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex-1">
            <p className="text-blue-200 text-sm font-medium mb-1">Progresso Geral do Planejamento</p>
            <div className="text-5xl font-bold mb-3">{progressoGeral}%</div>
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div
                className="bg-white rounded-full h-2.5 transition-all duration-1000"
                style={{ width: `${progressoGeral}%` }}
              />
            </div>
            <p className="text-blue-200 text-xs mt-2">
              Média dos {objectives.length} objetivos estratégicos • {goals.length} metas monitoradas
            </p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-white/20" />
          <div className="flex sm:flex-col gap-6 sm:gap-3">
            <div className="text-center">
              <div className="text-2xl font-bold">{Math.round((concluidas / totalMetas) * 100)}%</div>
              <div className="text-blue-200 text-xs">Taxa de Conclusão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{objectives.length}</div>
              <div className="text-blue-200 text-xs">Objetivos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => handleCardClick(card.filter)}
            className={`${card.bgLight} ${card.border} border rounded-xl p-5 text-left cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <ArrowRight
                size={14}
                className={`${card.textColor} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </div>
            <div className={`text-3xl font-bold ${card.textColor}`}>{card.value}</div>
            <div className="text-slate-500 text-xs mt-1">{card.label}</div>
          </button>
        ))}
      </div>

      {/* Charts Row — Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 font-semibold mb-1">Progresso por Objetivo Estratégico</h3>
          <p className="text-slate-400 text-xs mb-5">Clique em uma barra para filtrar as metas</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={objectiveChartData}
              onClick={handleObjectiveBarClick}
              style={{ cursor: "pointer" }}
              margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "#94a3b8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="progresso" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {objectiveChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-3 justify-center">
            {[
              { color: "#16a34a", label: "Sucesso (≥90%)" },
              { color: "#d97706", label: "Atenção (70–89%)" },
              { color: "#dc2626", label: "Risco (<70%)" },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 font-semibold mb-1">Distribuição de Metas</h3>
          <p className="text-slate-400 text-xs mb-3">Por status atual</p>
          <ResponsiveContainer width="100%" height={190}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value} metas`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.fill }} />
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <span className="font-medium text-slate-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Radar + Strategic Map row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 font-semibold mb-1">Radar Estratégico</h3>
          <p className="text-slate-400 text-xs mb-4">
            Desempenho comparativo entre objetivos — identifique áreas críticas
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fill: "#64748b", fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "#94a3b8" }}
                tickFormatter={(v) => `${v}%`}
                tickCount={4}
              />
              <Radar
                name="Progresso"
                dataKey="value"
                stroke="#2563eb"
                fill="#2563eb"
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Tooltip content={<CustomRadarTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1.5">
            {radarData.map((d) => {
              const { color } = getProgressStatus(d.value);
              const dotColor = color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500";
              return (
                <div key={d.subject} className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
                  <span className="text-slate-500 truncate">{d.fullName}</span>
                  <span className="ml-auto font-semibold text-slate-700">{d.value}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Map — takes full right side */}
        <div className="lg:col-span-3">
          <MapaEstrategico />
        </div>
      </div>

      {/* Objetivos Overview + Atenção */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Objectives Progress */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-slate-800 font-semibold mb-4">Status dos Objetivos</h3>
          <div className="space-y-4">
            {objectives.map((obj) => {
              const prog = getObjectiveProgress(obj.id, goals);
              const { label, color } = getProgressStatus(prog);
              const goalCount = goals.filter((g) => g.objectiveId === obj.id).length;
              const badgeColors: Record<string, string> = {
                green: "bg-green-100 text-green-700",
                yellow: "bg-yellow-100 text-yellow-700",
                red: "bg-red-100 text-red-700",
              };
              const barColors: Record<string, string> = {
                green: "bg-green-500",
                yellow: "bg-yellow-500",
                red: "bg-red-500",
              };
              return (
                <button
                  key={obj.id}
                  onClick={() => {
                    setGoalFilter({ objectiveId: obj.id });
                    navigate("/metas");
                  }}
                  className="w-full text-left group hover:bg-slate-50 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-700 font-medium group-hover:text-blue-700 transition-colors line-clamp-1">
                      Obj. {obj.number}: {obj.title}
                    </span>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span className="text-xs text-slate-400">{goalCount} metas</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColors[color]}`}>
                        {label}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className={`${barColors[color]} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${prog}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-700 w-10 text-right">{prog}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Atenção */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="text-red-500" size={18} />
            <h3 className="text-slate-800 font-semibold">Objetivos que Precisam de Atenção</h3>
          </div>
          <p className="text-slate-400 text-xs mb-4">
            Objetivos com menor progresso — prioridades estratégicas
          </p>
          <div className="space-y-4">
            {atencaoObjetivos.map((obj, idx) => {
              const { label, color } = getProgressStatus(obj.progress);
              const borderColors: Record<string, string> = {
                red: "border-red-400 bg-red-50",
                yellow: "border-yellow-400 bg-yellow-50",
                green: "border-green-400 bg-green-50",
              };
              const textColors: Record<string, string> = {
                red: "text-red-700",
                yellow: "text-yellow-700",
                green: "text-green-700",
              };
              return (
                <div
                  key={obj.id}
                  className={`border-l-4 rounded-lg p-4 ${borderColors[color]}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                        <span className="text-sm font-medium text-slate-800 line-clamp-2">{obj.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 mb-2 line-clamp-2">{obj.description}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/60 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              color === "red" ? "bg-red-500" : color === "yellow" ? "bg-yellow-500" : "bg-green-500"
                            }`}
                            style={{ width: `${obj.progress}%` }}
                          />
                        </div>
                        <span className={`text-sm font-bold ${textColors[color]}`}>{obj.progress}%</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setGoalFilter({ objectiveId: obj.id });
                        navigate("/metas");
                      }}
                      className="flex-shrink-0 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}