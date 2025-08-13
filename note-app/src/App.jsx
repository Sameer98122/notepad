import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSave = () => {
    if (!note.trim()) return;

    if (editIndex !== null) {
      const updated = [...notes];
      updated[editIndex] = note;
      setNotes(updated);
      setEditIndex(null);
    } else {
      setNotes([note, ...notes]);
    }
    setNote("");
  };

  const handleEdit = (index) => {
    setNote(notes[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>📝 My Notepad</h1>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note here..."
      />
      <div className="btn-group">
        <button onClick={handleSave}>{editIndex !== null ? "Update" : "Add"} Note</button>
        <button onClick={() => setNote("")} className="clear-btn">Clear</button>
      </div>

      <div className="notes-container">
        {notes.length === 0 && <p className="empty-text">No notes yet. Start writing!</p>}
        {notes.map((n, i) => (
          <div key={i} className="note-card">
            <p>{n}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(i)}>✏ Edit</button>
              <button onClick={() => handleDelete(i)} className="delete-btn">🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
