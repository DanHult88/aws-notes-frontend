const RAW_BASE = import.meta.env.VITE_API_URL;

// Tvinga fram tydligt fel om env saknas
if (!RAW_BASE) {
  console.warn("VITE_API_URL is missing. Set it in Amplify env vars and redeploy.");
}

// Normalisera: ta bort ev. trailing slash
const API_BASE = (RAW_BASE || "").replace(/\/+$/, "");

async function request(path, options) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} - ${text}`.trim());
  }
  // DELETE kan returnera 204 utan body
  if (res.status === 204) return null;
  return res.json();
}

export function getNotes() {
  return request("/notes");
}

export function createNote(title, content) {
  return request("/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
}

export function updateNote(id, title, content) {
  return request(`/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
}

export function deleteNote(id) {
  return request(`/notes/${id}`, { method: "DELETE" });
}
