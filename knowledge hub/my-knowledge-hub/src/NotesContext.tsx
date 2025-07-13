import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface Note {
  id: string;
  title: string;
  tags: string;
  content: string;
  date: Date;
}

interface NotesContextType {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'date'>) => Promise<void>;
  updateNote: (id: string, updatedNote: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  fetchNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userEmail } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    if (!userEmail) {
      setNotes([]);
      return;
    }
    try {
      const response = await fetch(`/api/notes/${userEmail}`);
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      const data = await response.json();
      // Map _id to id and convert date string to Date object
      const mappedNotes = data.map((note: any) => ({
        id: note._id,
        title: note.title,
        tags: note.tags,
        content: note.content,
        date: new Date(note.date),
      }));
      setNotes(mappedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [userEmail]);

  const addNote = async (note: Omit<Note, 'id' | 'date'>) => {
    if (!userEmail) return;
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...note, userEmail }),
      });
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      const savedNote = await response.json();
      setNotes(prevNotes => [
        {
          id: savedNote._id,
          title: savedNote.title,
          tags: savedNote.tags,
          content: savedNote.content,
          date: new Date(savedNote.date),
        },
        ...prevNotes,
      ]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const updateNote = async (id: string, updatedNote: Partial<Note>) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      const savedNote = await response.json();
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id
            ? {
                id: savedNote._id,
                title: savedNote.title,
                tags: savedNote.tags,
                content: savedNote.content,
                date: new Date(savedNote.date),
              }
            : note
        )
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes }}>
      {children}
    </NotesContext.Provider>
  );
};
