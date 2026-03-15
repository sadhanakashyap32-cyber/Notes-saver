'use client';

import { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');

  const saveNote = () => {
    if (input.trim()) {
      setNotes([...notes, input]);
      setInput('');
    }
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Notes Saver
          </h1>

          <div className="space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write your note here..."
                className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 outline-none text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={saveNote}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Save Note
              </button>
            </div>

            <div className="space-y-3">
              {notes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg">No notes yet. Add your first note above!</p>
                </div>
              ) : (
                notes.map((note, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="text-gray-800 text-lg leading-relaxed">{note}</p>
                      </div>
                      <button
                        onClick={() => deleteNote(index)}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}