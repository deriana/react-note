import React, { useState } from "react";

const CreateNote = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = () => {
    const newNote = {
      title: title,
      content: content,
      date: new Date().toLocaleDateString(),
      status: "active",
    };
    addNote(newNote);
    setTitle("");
    setContent("");
  };

  return (
    <section className="create">
      <p>Create New Note</p>
      <div className="input">
        <label htmlFor="title">Note Title</label>
        <input
          type="text"
          placeholder="Input your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="note">Note</label>
        <textarea
          id="note"
          placeholder="Type your note here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleCreateNote}>Create</button>
    </section>
  );
};

export default CreateNote;
