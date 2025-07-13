import React from 'react';
import { useNavigate } from 'react-router-dom';
import NewNote from './NewNote';
import { useNotes } from '../NotesContext';

const NewNotePage: React.FC = () => {
  const { addNote } = useNotes();
  const navigate = useNavigate();

  const handleSave = async (note: { title: string; tags: string; content: string }) => {
    await addNote(note);
    navigate('/notes');
  };

  const handleCancel = () => {
    navigate('/notes');
  };

  return (
    <NewNote
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default NewNotePage;
