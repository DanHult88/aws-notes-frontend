// Read API base URL from Vite env
let API_BASE = import.meta.env.VITE_API_URL;

// Hard fail if missing (important for Amplify builds)
if (!API_BASE) {
  throw new Error(
    "VITE_API_URL is missing. Add it to Amplify Environment Variables."
  );
}

// Force HTTPS (prevents Mixed Content when frontend is on HTTPS)
if (API_BASE.startsWith("http://")) {
  API_BASE = API_BASE.replace("http://", "https://");
  console.warn("API base URL was upgraded to HTTPS:", API_BASE);
}

// ---- API calls ----

export async function getNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) {
    throw new Error(`Failed to fetch notes (${res.status})`);
  }
  return res.json();
}

export async function createNote(title, content = "") {
  const res = await fetch(`${API_BASE}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error(`Failed to create note (${res.status})`);
  }

  return res.json();
}

export async function updateNote(id, title, content = "") {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update note (${res.status})`);
  }

  return res.json();
}

export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete note (${res.status})`);
  }
}
