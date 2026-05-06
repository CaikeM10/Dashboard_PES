const API_URL = "http://localhost:3000";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// GET
export async function getMetas() {
  const res = await fetch(`${API_URL}/metas`, {
    headers: getAuthHeaders(),
  });

  return res.json();
}

// POST
export async function createMeta(data: any) {
  const res = await fetch(`${API_URL}/metas`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return res.json();
}

// DELETE
export async function deleteMeta(id: string) {
  await fetch(`${API_URL}/metas/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
}
