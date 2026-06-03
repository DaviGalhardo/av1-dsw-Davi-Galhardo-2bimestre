const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {})
    },
    ...options
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error(payload?.erro || payload?.message || "Falha na requisição");
  }

  return payload;
}

export function listarTarefas() {
  return request("/tarefas");
}

export function criarTarefa(descricao) {
  return request("/tarefas", {
    method: "POST",
    body: JSON.stringify({ descricao })
  });
}

export function atualizarTarefa(id, dados) {
  return request(`/tarefas/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dados)
  });
}

export function excluirTarefa(id) {
  return request(`/tarefas/${id}`, {
    method: "DELETE"
  });
}