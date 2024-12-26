import React from "react";

const Notes = ({ notes, deleteNote, markAsDone }) => {
  return (
    <section className="notes">
      <p>Notes</p>
      <div className="note-container">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h3>{note.title}</h3>
            <p>{note.date}</p>
            <p>{note.content}</p>
            <div className="button-container">
              <button onClick={() => deleteNote(index)}>Delete</button>
              <button onClick={() => markAsDone(index)}>Done</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Notes;
