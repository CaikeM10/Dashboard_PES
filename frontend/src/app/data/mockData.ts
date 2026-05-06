// ============================================================
// DADOS MOCK — Sistema PES (Planejamento Estratégico da Educação)
// ============================================================

export type UserRole = "admin" | "responsavel" | "gestor";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  sectorId?: string;
  avatar: string;
}

export interface Sector {
  id: string;
  name: string;
}

// ---- NOVA HIERARQUIA ----

export interface Challenge {
  id: string;
  number: number;
  title: string;
  description: string;
  period: string;
}

export interface StrategicObjective {
  id: string;
  number: number;
  challengeId: string;
  title: string;
  description: string;
  period: string;
  observations?: string;
  statusColor: "green" | "yellow" | "red";
}

export interface Delivery {
  id: string;
  challengeId: string;
  objectiveId: string;
  title: string;
  description: string;
  deadline: string;
}

export type GoalStatus = "Em andamento" | "Concluído" | "Atrasado";

export interface Action {
  id: string;
  goalId: string;
  description: string;
  responsibleId: string;
  deadline: string;
  status: "Pendente" | "Em andamento" | "Concluído";
}

export interface GoalClosure {
  finalStatus: "Concluída" | "Não concluída" | "Adiada";
  justification: string;
  evaluation: string;
  closureDate: string;
}

export interface Goal {
  id: string;
  objectiveId: string;
  deliveryId: string;
  description: string;
  sectorId: string;
  deadline: string;
  status: GoalStatus;
  executionPercent: number;
  lastUpdate: string;
  delayReason?: string;
  observations?: string[];
  isClosed: boolean;
  closure?: GoalClosure;
}

export interface ProgressUpdate {
  id: string;
  goalId: string;
  userId: string;
  previousPercent: number;
  newPercent: number;
  status: GoalStatus;
  observations: string;
  date: string;
}

// ---- MÓDULO ADMINISTRATIVO: ESCOLAS E ALUNOS ----

export interface School {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  status: "Ativa" | "Inativa";
}

export interface Student {
  id: string;
  name: string;
  schoolId: string;
  grade: string;
  status: "Ativo" | "Inativo" | "Evadido";
}

// ---- SETORES ----
export const sectors: Sector[] = [
  { id: "s1", name: "Ensino Fundamental" },
  { id: "s2", name: "Ensino Médio" },
  { id: "s3", name: "Educação Especial" },
  { id: "s4", name: "Formação de Professores" },
  { id: "s5", name: "Infraestrutura Escolar" },
  { id: "s6", name: "Gestão Financeira" },
  { id: "s7", name: "Tecnologia Educacional" },
];

// ---- USUÁRIOS ----
export const users: User[] = [
  {
    id: "u1",
    name: "Ana Paula Ribeiro",
    email: "admin@pes.edu.br",
    password: "admin123",
    role: "admin",
    avatar: "AP",
  },
  {
    id: "u2",
    name: "Carlos Mendes",
    email: "carlos@pes.edu.br",
    password: "resp123",
    role: "responsavel",
    sectorId: "s1",
    avatar: "CM",
  },
  {
    id: "u3",
    name: "Fernanda Costa",
    email: "fernanda@pes.edu.br",
    password: "resp123",
    role: "responsavel",
    sectorId: "s2",
    avatar: "FC",
  },
  {
    id: "u4",
    name: "Roberto Alves",
    email: "roberto@pes.edu.br",
    password: "resp123",
    role: "responsavel",
    sectorId: "s4",
    avatar: "RA",
  },
  {
    id: "u5",
    name: "Márcia Lima",
    email: "marcia@pes.edu.br",
    password: "gestor123",
    role: "gestor",
    avatar: "ML",
  },
  {
    id: "u6",
    name: "João Pereira",
    email: "joao@pes.edu.br",
    password: "gestor123",
    role: "gestor",
    avatar: "JP",
  },
];

// ---- DESAFIOS ----
export const challenges: Challenge[] = [
  {
    id: "c1",
    number: 1,
    title: "Melhoria da Qualidade do Ensino Básico",
    description:
      "Elevar os índices de aprendizagem nas etapas do Ensino Fundamental e Médio, com foco em Língua Portuguesa e Matemática.",
    period: "2024–2026",
  },
  {
    id: "c2",
    number: 2,
    title: "Valorização e Formação dos Profissionais da Educação",
    description:
      "Ampliar e qualificar a formação continuada dos professores e gestores escolares da rede pública.",
    period: "2024–2026",
  },
  {
    id: "c3",
    number: 3,
    title: "Inclusão e Equidade Educacional",
    description:
      "Garantir acesso, permanência e aprendizagem de todos os estudantes, com ênfase em populações vulneráveis.",
    period: "2024–2026",
  },
  {
    id: "c4",
    number: 4,
    title: "Modernização da Infraestrutura e Tecnologia",
    description:
      "Modernizar a infraestrutura física e tecnológica das escolas, promovendo ambientes de aprendizagem adequados.",
    period: "2024–2026",
  },
];

// ---- OBJETIVOS ESTRATÉGICOS ----
export const objectives: StrategicObjective[] = [
  {
    id: "o1",
    number: 1,
    challengeId: "c1",
    title: "Melhoria da Qualidade do Ensino Básico",
    description:
      "Elevar os índices de aprendizagem nas etapas do Ensino Fundamental e Médio, com foco em Língua Portuguesa e Matemática.",
    period: "2024–2026",
    statusColor: "green",
  },
  {
    id: "o2",
    number: 2,
    challengeId: "c2",
    title: "Valorização e Formação dos Profissionais da Educação",
    description:
      "Ampliar e qualificar a formação continuada dos professores e gestores escolares da rede pública.",
    period: "2024–2026",
    statusColor: "yellow",
  },
  {
    id: "o3",
    number: 3,
    challengeId: "c3",
    title: "Inclusão e Equidade Educacional",
    description:
      "Garantir acesso, permanência e aprendizagem de todos os estudantes, com ênfase em populações vulneráveis.",
    period: "2024–2026",
    statusColor: "red",
  },
  {
    id: "o4",
    number: 4,
    challengeId: "c4",
    title: "Modernização da Infraestrutura e Tecnologia",
    description:
      "Modernizar a infraestrutura física e tecnológica das escolas, promovendo ambientes de aprendizagem adequados.",
    period: "2024–2026",
    statusColor: "green",
  },
];

// ---- ENTREGAS ----
export const deliveries: Delivery[] = [
  {
    id: "d1",
    challengeId: "c1",
    objectiveId: "o1",
    title: "Aumentar o IDEB do Ensino Fundamental para 6,0 até 2026",
    description: "Elevar os índices de aprendizagem nas etapas do Ensino Fundamental e Médio.",
    deadline: "2026-12-31",
  },
  {
    id: "d2",
    challengeId: "c1",
    objectiveId: "o1",
    title: "Implementar programa de reforço escolar em 100% das escolas",
    description: "Garantir que todas as escolas tenham programas de reforço para alunos em dificuldades.",
    deadline: "2025-12-31",
  },
  {
    id: "d3",
    challengeId: "c1",
    objectiveId: "o1",
    title: "Reduzir a taxa de reprovação em 30% no Ensino Médio",
    description: "Diminuir a taxa de reprovação em 30% nas escolas do Ensino Médio.",
    deadline: "2025-06-30",
  },
  {
    id: "d4",
    challengeId: "c1",
    objectiveId: "o1",
    title: "Implantar avaliações diagnósticas bimestrais em todas as escolas",
    description: "Realizar avaliações diagnósticas bimestrais para monitorar o progresso dos alunos.",
    deadline: "2025-03-31",
  },
  {
    id: "d5",
    challengeId: "c2",
    objectiveId: "o2",
    title: "Capacitar 80% dos professores em metodologias ativas até 2025",
    description: "Capacitar 80% dos professores em metodologias ativas para melhorar a qualidade do ensino.",
    deadline: "2025-12-31",
  },
  {
    id: "d6",
    challengeId: "c2",
    objectiveId: "o2",
    title: "Realizar 4 jornadas pedagógicas anuais com todos os docentes",
    description: "Realizar 4 jornadas pedagógicas anuais para capacitar os docentes.",
    deadline: "2025-11-30",
  },
  {
    id: "d7",
    challengeId: "c2",
    objectiveId: "o2",
    title: "Garantir plano de carreira para 100% dos servidores da educação",
    description: "Garantir que todos os servidores da educação tenham um plano de carreira definido.",
    deadline: "2026-06-30",
  },
  {
    id: "d8",
    challengeId: "c3",
    objectiveId: "o3",
    title: "Ampliar atendimento especializado para 100% dos alunos com deficiência",
    description: "Ampliar o atendimento especializado para alunos com deficiência.",
    deadline: "2025-12-31",
  },
  {
    id: "d9",
    challengeId: "c3",
    objectiveId: "o3",
    title: "Reduzir a evasão escolar em 25% nas comunidades vulneráveis",
    description: "Reduzir a evasão escolar em 25% nas comunidades vulneráveis.",
    deadline: "2025-06-30",
  },
  {
    id: "d10",
    challengeId: "c3",
    objectiveId: "o3",
    title: "Implementar programa de bolsas permanência para estudantes em risco",
    description: "Implementar um programa de bolsas de permanência para estudantes em risco de evasão.",
    deadline: "2025-09-30",
  },
  {
    id: "d11",
    challengeId: "c3",
    objectiveId: "o3",
    title: "Disponibilizar transporte escolar para 100% dos alunos da zona rural",
    description: "Garantir que todos os alunos da zona rural tenham transporte escolar disponível.",
    deadline: "2026-03-31",
  },
  {
    id: "d12",
    challengeId: "c4",
    objectiveId: "o4",
    title: "Reformar e adequar 70% das escolas às normas de acessibilidade",
    description: "Reformar e adequar 70% das escolas às normas de acessibilidade para alunos com deficiência.",
    deadline: "2026-12-31",
  },
  {
    id: "d13",
    challengeId: "c4",
    objectiveId: "o4",
    title: "Garantir internet de alta velocidade em 100% das escolas",
    description: "Garantir que todas as escolas tenham internet de alta velocidade para uso educacional.",
    deadline: "2025-12-31",
  },
  {
    id: "d14",
    challengeId: "c4",
    objectiveId: "o4",
    title: "Equipar laboratórios de informática em todas as escolas estaduais",
    description: "Equipar laboratórios de informática em todas as escolas estaduais para uso educacional.",
    deadline: "2026-06-30",
  },
  {
    id: "d15",
    challengeId: "c4",
    objectiveId: "o4",
    title: "Construir 5 novas unidades escolares nas regiões de maior demanda",
    description: "Construir 5 novas unidades escolares nas regiões de maior demanda para atender a população.",
    deadline: "2026-12-31",
  },
];

// ---- AÇÕES ----
export const actions: Action[] = [
  {
    id: "a1",
    goalId: "m1",
    description: "Realizar avaliações bimestrais para monitorar o progresso dos alunos.",
    responsibleId: "u2",
    deadline: "2026-02-28",
    status: "Concluído",
  },
  {
    id: "a2",
    goalId: "m2",
    description: "Abrir novos grupos de reforço em 12 escolas.",
    responsibleId: "u2",
    deadline: "2026-02-20",
    status: "Concluído",
  },
  {
    id: "a3",
    goalId: "m3",
    description: "Revisar a estratégia de intervenção para reduzir a taxa de reprovação.",
    responsibleId: "u3",
    deadline: "2026-01-15",
    status: "Pendente",
  },
  {
    id: "a4",
    goalId: "m4",
    description: "Implementar avaliações diagnósticas bimestrais em todas as 156 escolas da rede.",
    responsibleId: "u2",
    deadline: "2026-02-10",
    status: "Concluído",
  },
  {
    id: "a5",
    goalId: "m5",
    description: "Concluir a última turma de capacitação com 180 professores.",
    responsibleId: "u4",
    deadline: "2026-02-25",
    status: "Concluído",
  },
  {
    id: "a6",
    goalId: "m6",
    description: "Realizar a 4ª Jornada Pedagógica com sucesso.",
    responsibleId: "u4",
    deadline: "2026-01-20",
    status: "Concluído",
  },
  {
    id: "a7",
    goalId: "m7",
    description: "Aprovar a proposta de plano de carreira em comissão.",
    responsibleId: "u4",
    deadline: "2026-02-18",
    status: "Em andamento",
  },
  {
    id: "a8",
    goalId: "m8",
    description: "Contratar novos profissionais de apoio para ampliar a cobertura.",
    responsibleId: "u2",
    deadline: "2026-02-22",
    status: "Concluído",
  },
  {
    id: "a9",
    goalId: "m9",
    description: "Revisar a abordagem para reduzir a evasão escolar.",
    responsibleId: "u2",
    deadline: "2026-01-10",
    status: "Pendente",
  },
  {
    id: "a10",
    goalId: "m10",
    description: "Cadastrar todos os beneficiários e ativar as bolsas.",
    responsibleId: "u4",
    deadline: "2026-02-05",
    status: "Concluído",
  },
  {
    id: "a11",
    goalId: "m11",
    description: "Adquirir novos veículos para 3 municípios.",
    responsibleId: "u2",
    deadline: "2026-02-28",
    status: "Concluído",
  },
  {
    id: "a12",
    goalId: "m12",
    description: "Avançar com as obras em 15 unidades e licitar novas reformas.",
    responsibleId: "u4",
    deadline: "2026-02-15",
    status: "Em andamento",
  },
  {
    id: "a13",
    goalId: "m13",
    description: "Instalar novas conexões e aguardar infraestrutura para 12 escolas.",
    responsibleId: "u4",
    deadline: "2026-02-27",
    status: "Em andamento",
  },
  {
    id: "a14",
    goalId: "m14",
    description: "Entregar equipamentos em 45 escolas e instalar em andamento.",
    responsibleId: "u4",
    deadline: "2026-02-20",
    status: "Em andamento",
  },
  {
    id: "a15",
    goalId: "m15",
    description: "Obter licenças ambientais para 2 unidades e iniciar construção em 1 local.",
    responsibleId: "u4",
    deadline: "2026-01-30",
    status: "Pendente",
  },
];

// ---- METAS ----
export const goals: Goal[] = [
  // Objetivo 1
  {
    id: "m1",
    objectiveId: "o1",
    deliveryId: "d1",
    description: "Aumentar o IDEB do Ensino Fundamental para 6,0 até 2026",
    sectorId: "s1",
    deadline: "2026-12-31",
    status: "Em andamento",
    executionPercent: 62,
    lastUpdate: "2026-02-28",
    observations: ["Resultado das avaliações bimestrais indica melhora gradual nos índices de leitura."],
    isClosed: false,
  },
  {
    id: "m2",
    objectiveId: "o1",
    deliveryId: "d2",
    description: "Implementar programa de reforço escolar em 100% das escolas",
    sectorId: "s1",
    deadline: "2025-12-31",
    status: "Em andamento",
    executionPercent: 78,
    lastUpdate: "2026-02-20",
    observations: ["Novos grupos de reforço foram abertos em 12 escolas. Restam 8 unidades a implementar."],
    isClosed: false,
  },
  {
    id: "m3",
    objectiveId: "o1",
    deliveryId: "d3",
    description: "Reduzir a taxa de reprovação em 30% no Ensino Médio",
    sectorId: "s2",
    deadline: "2025-06-30",
    status: "Atrasado",
    executionPercent: 45,
    lastUpdate: "2026-01-15",
    delayReason: "Prazo original não foi atingido. Aguardando redesenho da estratégia de intervenção.",
    observations: ["Prazo expirado. Equipe técnica revisando abordagem. Novo cronograma em elaboração."],
    isClosed: false,
  },
  {
    id: "m4",
    objectiveId: "o1",
    deliveryId: "d4",
    description: "Implantar avaliações diagnósticas bimestrais em todas as escolas",
    sectorId: "s1",
    deadline: "2025-03-31",
    status: "Concluído",
    executionPercent: 100,
    lastUpdate: "2026-02-10",
    observations: ["Avaliações implementadas em todas as 156 escolas da rede. Meta concluída."],
    isClosed: true,
    closure: {
      finalStatus: "Concluída",
      justification: "Avaliações implementadas em todas as escolas.",
      evaluation: "Meta concluída com sucesso.",
      closureDate: "2026-02-10",
    },
  },
  // Objetivo 2
  {
    id: "m5",
    objectiveId: "o2",
    deliveryId: "d5",
    description: "Capacitar 80% dos professores em metodologias ativas até 2025",
    sectorId: "s4",
    deadline: "2025-12-31",
    status: "Em andamento",
    executionPercent: 71,
    lastUpdate: "2026-02-25",
    observations: ["Última turma de capacitação concluída com 180 professores. Próxima turma em março."],
    isClosed: false,
  },
  {
    id: "m6",
    objectiveId: "o2",
    deliveryId: "d6",
    description: "Realizar 4 jornadas pedagógicas anuais com todos os docentes",
    sectorId: "s4",
    deadline: "2025-11-30",
    status: "Concluído",
    executionPercent: 100,
    lastUpdate: "2026-01-20",
    observations: ["4ª Jornada Pedagógica realizada com sucesso. Participação de 98% dos docentes."],
    isClosed: true,
    closure: {
      finalStatus: "Concluída",
      justification: "Jornada pedagógica realizada com sucesso.",
      evaluation: "Meta concluída com sucesso.",
      closureDate: "2026-01-20",
    },
  },
  {
    id: "m7",
    objectiveId: "o2",
    deliveryId: "d7",
    description: "Garantir plano de carreira para 100% dos servidores da educação",
    sectorId: "s6",
    deadline: "2026-06-30",
    status: "Em andamento",
    executionPercent: 55,
    lastUpdate: "2026-02-18",
    observations: ["Proposta de plano de carreira aprovada em comissão. Em fase de regulamentação."],
    isClosed: false,
  },
  // Objetivo 3
  {
    id: "m8",
    objectiveId: "o3",
    deliveryId: "d8",
    description: "Ampliar atendimento especializado para 100% dos alunos com deficiência",
    sectorId: "s3",
    deadline: "2025-12-31",
    status: "Em andamento",
    executionPercent: 83,
    lastUpdate: "2026-02-22",
    observations: ["Novos profissionais de apoio contratados. Cobertura ampliada para 83% dos alunos cadastrados."],
    isClosed: false,
  },
  {
    id: "m9",
    objectiveId: "o3",
    deliveryId: "d9",
    description: "Reduzir a evasão escolar em 25% nas comunidades vulneráveis",
    sectorId: "s1",
    deadline: "2025-06-30",
    status: "Atrasado",
    executionPercent: 38,
    lastUpdate: "2026-01-10",
    delayReason: "Prazo expirado. Equipe técnica revisando abordagem. Novo cronograma em elaboração.",
    observations: ["Prazo expirado. Equipe técnica revisando abordagem. Novo cronograma em elaboração."],
    isClosed: false,
  },
  {
    id: "m10",
    objectiveId: "o3",
    deliveryId: "d10",
    description: "Implementar programa de bolsas permanência para estudantes em risco",
    sectorId: "s6",
    deadline: "2025-09-30",
    status: "Concluído",
    executionPercent: 100,
    lastUpdate: "2026-02-05",
    observations: ["Todos os beneficiários cadastrados e bolsas ativas. Programa implementado com sucesso."],
    isClosed: true,
    closure: {
      finalStatus: "Concluída",
      justification: "Programa de bolsas permanência implementado com sucesso.",
      evaluation: "Meta concluída com sucesso.",
      closureDate: "2026-02-05",
    },
  },
  {
    id: "m11",
    objectiveId: "o3",
    deliveryId: "d11",
    description: "Disponibilizar transporte escolar para 100% dos alunos da zona rural",
    sectorId: "s5",
    deadline: "2026-03-31",
    status: "Em andamento",
    executionPercent: 67,
    lastUpdate: "2026-02-28",
    observations: ["Novos veículos adquiridos para 3 municípios. Restam 4 municípios sem cobertura total."],
    isClosed: false,
  },
  // Objetivo 4
  {
    id: "m12",
    objectiveId: "o4",
    deliveryId: "d12",
    description: "Reformar e adequar 70% das escolas às normas de acessibilidade",
    sectorId: "s5",
    deadline: "2026-12-31",
    status: "Em andamento",
    executionPercent: 42,
    lastUpdate: "2026-02-15",
    observations: ["Obras em andamento em 15 unidades. Licitação para novas reformas em fase final."],
    isClosed: false,
  },
  {
    id: "m13",
    objectiveId: "o4",
    deliveryId: "d13",
    description: "Garantir internet de alta velocidade em 100% das escolas",
    sectorId: "s7",
    deadline: "2025-12-31",
    status: "Em andamento",
    executionPercent: 88,
    lastUpdate: "2026-02-27",
    observations: ["Novas conexões instaladas. Restam 12 escolas em áreas remotas aguardando infraestrutura."],
    isClosed: false,
  },
  {
    id: "m14",
    objectiveId: "o4",
    deliveryId: "d14",
    description: "Equipar laboratórios de informática em todas as escolas estaduais",
    sectorId: "s7",
    deadline: "2026-06-30",
    status: "Em andamento",
    executionPercent: 60,
    lastUpdate: "2026-02-20",
    observations: ["Equipamentos entregues em 45 escolas. Instalação em andamento."],
    isClosed: false,
  },
  {
    id: "m15",
    objectiveId: "o4",
    deliveryId: "d15",
    description: "Construir 5 novas unidades escolares nas regiões de maior demanda",
    sectorId: "s5",
    deadline: "2026-12-31",
    status: "Atrasado",
    executionPercent: 20,
    lastUpdate: "2026-01-30",
    delayReason: "Licenças ambientais obtidas para 2 unidades. Construção iniciada em 1 local.",
    observations: ["Licenças ambientais obtidas para 2 unidades. Construção iniciada em 1 local."],
    isClosed: false,
  },
];

// ---- HISTÓRICO DE ATUALIZAÇÕES ----
export const progressUpdates: ProgressUpdate[] = [
  {
    id: "pu1",
    goalId: "m1",
    userId: "u2",
    previousPercent: 55,
    newPercent: 62,
    status: "Em andamento",
    observations: "Resultado das avaliações bimestrais indica melhora gradual nos índices de leitura.",
    date: "2026-02-28",
  },
  {
    id: "pu2",
    goalId: "m2",
    userId: "u2",
    previousPercent: 70,
    newPercent: 78,
    status: "Em andamento",
    observations: "Novos grupos de reforço foram abertos em 12 escolas. Restam 8 unidades a implementar.",
    date: "2026-02-20",
  },
  {
    id: "pu3",
    goalId: "m3",
    userId: "u3",
    previousPercent: 45,
    newPercent: 45,
    status: "Atrasado",
    observations: "Prazo original não foi atingido. Aguardando redesenho da estratégia de intervenção.",
    date: "2026-01-15",
  },
  {
    id: "pu4",
    goalId: "m4",
    userId: "u2",
    previousPercent: 90,
    newPercent: 100,
    status: "Concluído",
    observations: "Avaliações implementadas em todas as 156 escolas da rede. Meta concluída.",
    date: "2026-02-10",
  },
  {
    id: "pu5",
    goalId: "m5",
    userId: "u4",
    previousPercent: 60,
    newPercent: 71,
    status: "Em andamento",
    observations: "Última turma de capacitação concluída com 180 professores. Próxima turma em março.",
    date: "2026-02-25",
  },
  {
    id: "pu6",
    goalId: "m6",
    userId: "u4",
    previousPercent: 75,
    newPercent: 100,
    status: "Concluído",
    observations: "4ª Jornada Pedagógica realizada com sucesso. Participação de 98% dos docentes.",
    date: "2026-01-20",
  },
  {
    id: "pu7",
    goalId: "m7",
    userId: "u4",
    previousPercent: 40,
    newPercent: 55,
    status: "Em andamento",
    observations: "Proposta de plano de carreira aprovada em comissão. Em fase de regulamentação.",
    date: "2026-02-18",
  },
  {
    id: "pu8",
    goalId: "m8",
    userId: "u2",
    previousPercent: 75,
    newPercent: 83,
    status: "Em andamento",
    observations: "Novos profissionais de apoio contratados. Cobertura ampliada para 83% dos alunos cadastrados.",
    date: "2026-02-22",
  },
  {
    id: "pu9",
    goalId: "m9",
    userId: "u2",
    previousPercent: 38,
    newPercent: 38,
    status: "Atrasado",
    observations: "Prazo expirado. Equipe técnica revisando abordagem. Novo cronograma em elaboração.",
    date: "2026-01-10",
  },
  {
    id: "pu10",
    goalId: "m10",
    userId: "u4",
    previousPercent: 85,
    newPercent: 100,
    status: "Concluído",
    observations: "Todos os beneficiários cadastrados e bolsas ativas. Programa implementado com sucesso.",
    date: "2026-02-05",
  },
  {
    id: "pu11",
    goalId: "m11",
    userId: "u2",
    previousPercent: 55,
    newPercent: 67,
    status: "Em andamento",
    observations: "Novos veículos adquiridos para 3 municípios. Restam 4 municípios sem cobertura total.",
    date: "2026-02-28",
  },
  {
    id: "pu12",
    goalId: "m12",
    userId: "u4",
    previousPercent: 35,
    newPercent: 42,
    status: "Em andamento",
    observations: "Obras em andamento em 15 unidades. Licitação para novas reformas em fase final.",
    date: "2026-02-15",
  },
  {
    id: "pu13",
    goalId: "m13",
    userId: "u4",
    previousPercent: 80,
    newPercent: 88,
    status: "Em andamento",
    observations: "Novas conexões instaladas. Restam 12 escolas em áreas remotas aguardando infraestrutura.",
    date: "2026-02-27",
  },
  {
    id: "pu14",
    goalId: "m14",
    userId: "u4",
    previousPercent: 50,
    newPercent: 60,
    status: "Em andamento",
    observations: "Equipamentos entregues em 45 escolas. Instalação em andamento.",
    date: "2026-02-20",
  },
  {
    id: "pu15",
    goalId: "m15",
    userId: "u4",
    previousPercent: 10,
    newPercent: 20,
    status: "Atrasado",
    observations: "Licenças ambientais obtidas para 2 unidades. Construção iniciada em 1 local.",
    date: "2026-01-30",
  },
];

// ---- HELPERS ----
export function getObjectiveProgress(objectiveId: string, goalsList: Goal[]): number {
  const objectiveGoals = goalsList.filter((g) => g.objectiveId === objectiveId);
  if (objectiveGoals.length === 0) return 0;
  const sum = objectiveGoals.reduce((acc, g) => acc + g.executionPercent, 0);
  return Math.round(sum / objectiveGoals.length);
}

export function getOverallProgress(goalsList: Goal[]): number {
  if (goalsList.length === 0) return 0;
  const sum = goalsList.reduce((acc, g) => acc + g.executionPercent, 0);
  return Math.round(sum / goalsList.length);
}

export function getStatusColor(status: GoalStatus): string {
  switch (status) {
    case "Concluído":
      return "green";
    case "Em andamento":
      return "blue";
    case "Atrasado":
      return "red";
  }
}

export function getProgressStatus(percent: number): { label: string; color: string } {
  if (percent >= 90) return { label: "Sucesso", color: "green" };
  if (percent >= 70) return { label: "Atenção", color: "yellow" };
  return { label: "Risco", color: "red" };
}

export function getSectorById(id: string): Sector | undefined {
  return sectors.find((s) => s.id === id);
}

export function getObjectiveById(id: string): StrategicObjective | undefined {
  return objectives.find((o) => o.id === id);
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getGoalById(id: string): Goal | undefined {
  return goals.find((g) => g.id === id);
}

// ---- ESCOLAS ----
export const schools: School[] = [
  {
    id: "sc1",
    name: "Escola Estadual Dom Pedro II",
    code: "ESC001",
    address: "Rua das Flores, 123 - Centro",
    phone: "(11) 1234-5678",
    status: "Ativa",
  },
  {
    id: "sc2",
    name: "Escola Municipal Maria Quitéria",
    code: "ESC002",
    address: "Av. Brasil, 456 - Bairro Novo",
    phone: "(11) 2345-6789",
    status: "Ativa",
  },
  {
    id: "sc3",
    name: "Colégio Estadual Santos Dumont",
    code: "ESC003",
    address: "Rua dos Pássaros, 789 - Jardim Primavera",
    phone: "(11) 3456-7890",
    status: "Ativa",
  },
  {
    id: "sc4",
    name: "Escola Municipal Tiradentes",
    code: "ESC004",
    address: "Rua do Sol, 321 - Vila Nova",
    phone: "(11) 4567-8901",
    status: "Ativa",
  },
  {
    id: "sc5",
    name: "Escola Estadual Princesa Isabel",
    code: "ESC005",
    address: "Av. Liberdade, 654 - Centro Histórico",
    phone: "(11) 5678-9012",
    status: "Ativa",
  },
  {
    id: "sc6",
    name: "Colégio Municipal José de Anchieta",
    code: "ESC006",
    address: "Rua das Acácias, 987 - Parque das Árvores",
    phone: "(11) 6789-0123",
    status: "Inativa",
  },
  {
    id: "sc7",
    name: "Escola Estadual Machado de Assis",
    code: "ESC007",
    address: "Rua dos Escritores, 159 - Bairro Literário",
    phone: "(11) 7890-1234",
    status: "Ativa",
  },
  {
    id: "sc8",
    name: "Escola Municipal Castro Alves",
    code: "ESC008",
    address: "Av. dos Poetas, 753 - Vila Cultural",
    phone: "(11) 8901-2345",
    status: "Ativa",
  },
];

// ---- ALUNOS ----
export const students: Student[] = [
  {
    id: "st1",
    name: "João Pedro Silva",
    schoolId: "sc1",
    grade: "8º Ano EF",
    status: "Ativo",
  },
  {
    id: "st2",
    name: "Maria Eduarda Santos",
    schoolId: "sc1",
    grade: "9º Ano EF",
    status: "Ativo",
  },
  {
    id: "st3",
    name: "Lucas Henrique Souza",
    schoolId: "sc2",
    grade: "7º Ano EF",
    status: "Ativo",
  },
  {
    id: "st4",
    name: "Ana Clara Oliveira",
    schoolId: "sc2",
    grade: "6º Ano EF",
    status: "Ativo",
  },
  {
    id: "st5",
    name: "Gabriel Fernando Costa",
    schoolId: "sc3",
    grade: "1º Ano EM",
    status: "Ativo",
  },
  {
    id: "st6",
    name: "Beatriz Almeida",
    schoolId: "sc3",
    grade: "2º Ano EM",
    status: "Ativo",
  },
  {
    id: "st7",
    name: "Pedro Henrique Lima",
    schoolId: "sc4",
    grade: "5º Ano EF",
    status: "Ativo",
  },
  {
    id: "st8",
    name: "Julia Vitória Rodrigues",
    schoolId: "sc4",
    grade: "4º Ano EF",
    status: "Evadido",
  },
  {
    id: "st9",
    name: "Matheus Augusto Pereira",
    schoolId: "sc5",
    grade: "3º Ano EM",
    status: "Ativo",
  },
  {
    id: "st10",
    name: "Larissa Fernanda Martins",
    schoolId: "sc5",
    grade: "1º Ano EM",
    status: "Ativo",
  },
  {
    id: "st11",
    name: "Rafael dos Santos",
    schoolId: "sc6",
    grade: "8º Ano EF",
    status: "Inativo",
  },
  {
    id: "st12",
    name: "Camila Ribeiro",
    schoolId: "sc7",
    grade: "9º Ano EF",
    status: "Ativo",
  },
  {
    id: "st13",
    name: "Felipe Gustavo Carvalho",
    schoolId: "sc7",
    grade: "7º Ano EF",
    status: "Ativo",
  },
  {
    id: "st14",
    name: "Isabella Sophia Ferreira",
    schoolId: "sc8",
    grade: "6º Ano EF",
    status: "Ativo",
  },
  {
    id: "st15",
    name: "Vitor Hugo Gonçalves",
    schoolId: "sc8",
    grade: "5º Ano EF",
    status: "Evadido",
  },
];