'use client';

import { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const saveNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput('');
    }
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Notes Saver</h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your note here..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={saveNote}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Save Note
        </button>
        <div className="mt-8">
          {notes.map((note, index) => (
            <div key={index} className="bg-white p-4 rounded shadow mb-2 flex justify-between items-center">
              <span>{note}</span>
              <button
                onClick={() => deleteNote(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
