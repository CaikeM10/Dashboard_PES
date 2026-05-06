const API_URL = "http://localhost:3000";

// 🔐 LOGIN
export async function login(email: string, senha: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    throw new Error("Erro no login");
  }

  return response.json();
}

// 🔒 PEGAR TOKEN
function getToken() {
  return localStorage.getItem("token");
}

// 🔒 HEADERS PADRÃO
function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

// GET METAS
export async function getMetas() {
  const response = await fetch(`${API_URL}/metas`, {
    headers: authHeaders(),
  });

  return response.json();
}

// CREATE META
export async function createMeta(data: any) {
  const response = await fetch(`${API_URL}/metas`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  return response.json();
}

// DELETE META
export async function deleteMeta(id: string) {
  await fetch(`${API_URL}/metas/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
