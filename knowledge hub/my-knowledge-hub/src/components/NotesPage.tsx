import React, { useState } from 'react';
import { useNotes } from '../NotesContext';
import NotesList from './NotesList';
import NewNote from './NewNote';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const NotesPage: React.FC = () => {
  const { notes, updateNote, deleteNote } = useNotes();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUpdateNote = async (id: string, updatedNote: { title?: string; content?: string; tags?: string }) => {
    await updateNote(id, updatedNote);
    setEditingNoteId(null);
  };

  const handleDeleteNote = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="top-header">
        <div className="logo">
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="#1D4ED8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-brain"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.79 6.22 4.44 7.81"></path>
            <path d="M12 2c5.52 0 10 4.48 10 10 0 3.31-1.79 6.22-4.44 7.81"></path>
            <path d="M12 12v10"></path>
            <path d="M12 12c-1.1 0-2-.9-2-2"></path>
            <path d="M12 12c1.1 0 2-.9 2-2"></path>
          </svg>
          <span>KnowledgeHub</span>
        </div>
        <div className="header-right">
          <button className="dark-mode-toggle" aria-label="Toggle dark mode">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-moon"
              viewBox="0 0 24 24"
            >
              <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <div className="user-email" onClick={toggleUserMenu} style={{ cursor: 'pointer', position: 'relative' }}>
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="#374151"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-3-3.87"></path>
              <path d="M4 21v-2a4 4 0 013-3.87"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{userEmail}</span>
            {isUserMenuOpen && (
              <div className="user-menu-dropdown" style={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '120px',
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-out"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="notes-page-content">
        <h1>My Notes</h1>
        <button onClick={() => navigate('/newnote')}>+ New Note</button>
        <NotesList onEdit={setEditingNoteId} onDelete={handleDeleteNote} />
        {editingNoteId && (
          <NewNote
            note={notes.find(note => note.id === editingNoteId)}
            onSave={(updatedNote) => handleUpdateNote(editingNoteId, updatedNote)}
            onCancel={() => setEditingNoteId(null)}
            onDelete={() => handleDeleteNote(editingNoteId)}
          />
        )}
      </div>
    </div>
  );
};

export default NotesPage;
