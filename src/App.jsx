import { useEffect, useState } from "react";
import { getNotes, createNote } from "./api";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");

  async function loadNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  useEffect(() => {
    loadNotes();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createNote(title, "");
    setTitle("");
    await loadNotes();
  }

  return (
    <div className="App">
      <h1>Notes</h1>

      <form onSubmit={onSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New note title"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {notes.map((n) => (
          <li key={n.id}>{n.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
