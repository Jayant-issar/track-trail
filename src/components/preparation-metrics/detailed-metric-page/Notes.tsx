import React, { useState, useEffect } from 'react';

type Note = {
  id: string;
  content: string;
  createdAt: Date;
};

const Notes = ({metricId}: {metricId: string}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`prepMetricsNotes_${metricId}`);
    console.log(savedNotes);
    
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes, (key, value) => {
        if (key === 'createdAt') return new Date(value);
        return value;
      }));
    } else {
      setNotes([]); // Clear previous metric's notes
    }
  }, [metricId]);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`prepMetricsNotes_${metricId}`, JSON.stringify(notes));
  }, [notes, metricId]);

  const handleSaveNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        createdAt: new Date()
      };
      setNotes(prev => [note, ...prev]);
      setNewNote('');
    }
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    setSelectedNote(null);
  };

  return (
    <div className="bg-gray-800/50 rounded-lg border border-gray-700 p-6 h-auto max-h-96 overflow-hidden flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Progress Notes</h2>
      
      <div className="mb-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full h-32 bg-gray-700/20 border border-gray-700 rounded-lg p-3 text-gray-100 focus:outline-none focus:border-purple-500"
          placeholder="Add new note..."
        />
        <button
          onClick={handleSaveNote}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Save Note
        </button>
      </div>

      <div className="overflow-y-auto flex-1">
        {notes.map(note => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="group cursor-pointer p-3 mb-2 bg-gray-700/20 rounded-lg hover:bg-gray-700/40 transition-colors"
          >
            <p className="text-gray-300 truncate">{note.content}</p>
            <span className="text-xs text-gray-500">
              {note.createdAt.toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

      {/* Note Detail Popover */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Note Details</h3>
              <button
                onClick={() => setSelectedNote(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="whitespace-pre-wrap mb-4">{selectedNote.content}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">
                Created: {selectedNote.createdAt.toLocaleString()}
              </span>
              <button
                onClick={() => deleteNote(selectedNote.id)}
                className="text-red-400 hover:text-red-300"
              >
                Delete Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;