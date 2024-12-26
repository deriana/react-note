import React from "react";

const Done = ({ notes, deleteNote, undoDone }) => {
  return (
    <section className="notes">
      <p>Done</p>
      <div className="note-container">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h3>{note.title}</h3>
            <p>{note.date}</p>
            <p>{note.content}</p>
            <div className="button-container">
              <button onClick={() => deleteNote(index, true)}>Delete</button>
              <button onClick={() => undoDone(index)}>Undo</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Done;
