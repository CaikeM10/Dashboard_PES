const API_URL = "http://localhost:3000";

// =========================
// 🔐 AUTENTICAÇÃO
// =========================

export async function login(email: string, senha: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro no login");
  }

  return data;
}

// =========================
// 🔒 TOKEN E HEADERS
// =========================

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// =========================
// 📊 METAS
// =========================

// LISTAR METAS
export async function getMetas() {
  const response = await fetch(`${API_URL}/metas`, {
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao buscar metas");
  }

  return data;
}

// CRIAR META
export async function createMeta(data: any) {
  const response = await fetch(`${API_URL}/metas`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Erro ao criar meta");
  }

  return result;
}

// EXCLUIR META
export async function deleteMeta(id: string) {
  const response = await fetch(`${API_URL}/metas/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Erro ao excluir meta");
  }
}

// =========================
// 🏛️ IDENTIDADE ORGANIZACIONAL
// =========================

export interface IdentidadeOrganizacional {
  id: string;
  missao: string | null;
  visao: string | null;
  valores: string | null;
  createdAt: string;
  updatedAt: string;
}

// BUSCAR IDENTIDADE
export async function getIdentidade(): Promise<IdentidadeOrganizacional> {
  const response = await fetch(`${API_URL}/identidade`, {
    headers: authHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao carregar identidade organizacional");
  }

  return data;
}

// ATUALIZAR IDENTIDADE
export async function updateIdentidade(
  data: Partial<Pick<IdentidadeOrganizacional, "missao" | "visao" | "valores">>,
): Promise<IdentidadeOrganizacional> {
  const response = await fetch(`${API_URL}/identidade`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Erro ao salvar identidade organizacional");
  }

  return result;
}
