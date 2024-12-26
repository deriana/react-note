import React, { useState, useEffect } from "react";
import "./App.css";
import CreateNote from "./component/createNote";
import Done from "./component/done";
import Notes from "./component/note";
import img from "./assets/profile.jpeg";

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [doneNotes, setDoneNotes] = useState(() => {
    const savedDoneNotes = localStorage.getItem("doneNotes");
    return savedDoneNotes ? JSON.parse(savedDoneNotes) : [];
  });

  const [searchQuery, setSearchQuery] = useState(""); 
  const [showCreateNote, setShowCreateNote] = useState(false);

  const saveToLocalStorage = () => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("doneNotes", JSON.stringify(doneNotes));
  };

  useEffect(() => {
    saveToLocalStorage();
  }, [notes, doneNotes]);

  const addNote = (note) => {
    setNotes([...notes, note]);
  };

  const deleteNote = (noteIndex, fromDone = false) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!isConfirmed) return;

    if (fromDone) {
      const updatedDoneNotes = doneNotes.filter(
        (_, index) => index !== noteIndex
      );
      setDoneNotes(updatedDoneNotes);
    } else {
      const updatedNotes = notes.filter((_, index) => index !== noteIndex);
      setNotes(updatedNotes);
    }
  };

  const markAsDone = (noteIndex) => {
    const updatedNotes = [...notes];
    const [movedNote] = updatedNotes.splice(noteIndex, 1);
    setDoneNotes([...doneNotes, movedNote]);
    setNotes(updatedNotes);
  };

  const undoDone = (noteIndex) => {
    const updatedDoneNotes = [...doneNotes];
    const [movedNote] = updatedDoneNotes.splice(noteIndex, 1);
    setNotes([...notes, movedNote]);
    setDoneNotes(updatedDoneNotes);
  };

  const filterNotes = (notesArray) => {
    if (searchQuery === "") return notesArray;
    return notesArray.filter(
      (note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Hideri Notes</h1>
        <a href="https://www.instagram.com/hi_deri_/" target="_blank">
          <img src={img} alt="nigga bals" />
        </a>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <button className="toggle-create-note" onClick={() => setShowCreateNote(!showCreateNote)}>
        {showCreateNote ? "Hide Create Note" : "Show Create Note"}
      </button>

      {showCreateNote && <CreateNote addNote={addNote} />}

      <Notes
        notes={filterNotes(notes)} 
        deleteNote={deleteNote}
        markAsDone={markAsDone}
      />
      <Done
        notes={filterNotes(doneNotes)}
        deleteNote={deleteNote}
        undoDone={undoDone}
      />
    </div>
  );
};

export default App;
