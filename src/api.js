const API_BASE = "/api"; // <-- viktigt: samma domän, ingen mixed content

export async function getNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(title, content = "") {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(id, title, content = "") {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete note");
}
