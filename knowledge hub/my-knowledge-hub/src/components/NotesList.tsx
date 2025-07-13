import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useNotes } from '../NotesContext';
import './NotesList.css';
import { useAuth } from '../AuthContext';

const NotesList: React.FC<{ onEdit: (id: string) => void; onDelete: (id: string) => void }> = ({ onEdit, onDelete }) => {
  const navigate = useNavigate();
  const { notes } = useNotes();

  const handleCreateFirstNote = () => {
    navigate('/newnote');
  };

  const { userEmail, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = () => {
    if (logout) {
      logout();
    }
    setDropdownOpen(false);
    navigate('/login');
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="dashboard">
      <header className="top-header">
        <div className="logo">
          <svg width="24" height="24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-brain" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.79 6.22 4.44 7.81"></path><path d="M12 2c5.52 0 10 4.48 10 10 0 3.31-1.79 6.22-4.44 7.81"></path><path d="M12 12v10"></path><path d="M12 12c-1.1 0-2-.9-2-2"></path><path d="M12 12c1.1 0 2-.9 2-2"></path></svg>
          <span>KnowledgeHub</span>
        </div>
        <div className="header-right" ref={dropdownRef} style={{ cursor: 'pointer', position: 'relative' }}>
          <div className="user-email" onClick={toggleDropdown} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-3-3.87"></path>
              <path d="M4 21v-2a4 4 0 013-3.87"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>{userEmail}</span>
          </div>
          {dropdownOpen && (
            <div className="user-dropdown" style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: 'white',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              zIndex: 1000,
              minWidth: '120px',
              marginTop: '4px'
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
                  color: '#374151'
                }}
                onMouseDown={e => e.preventDefault()} // prevent focus loss on click
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <aside className="sidebar">
        <nav>
          <ul>
            <li className="active">
              <Link to="/dashboard">
                <svg width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/notes">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                Notes
              </Link>
            </li>
            <li>
              <Link to="/bookmarks">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
                Bookmarks
              </Link>
            </li>
            <li>
              {/* <Link to="/search">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Search
              </Link> */}
            </li>
            <li>
              <Link to="/tags">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag" viewBox="0 0 24 24"><path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path><circle cx="16.5" cy="7.5" r="1.5"></circle></svg>
                Tags
              </Link>
            </li>
            <li>
              {/* <Link to="/settings">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z"></path></svg>
                Settings
              </Link> */}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="notes-main">
        <section className="notes-content">
          <div className="notes-title-section">
            <h1>My Notes</h1>
            <p>{notes.length} {notes.length === 1 ? 'note' : 'notes'}</p>
            <button className="new-note-button" onClick={handleCreateFirstNote}>+ New Note</button>
          </div>
          <div className="notes-filters">
            <input
              type="text"
              placeholder="Search notes..."
              className="search-notes-input"
              disabled
            />
            <select disabled>
              <option>All tags</option>
            </select>
          </div>
          {notes.length === 0 ? (
            <div className="no-notes">
              <svg
                width="48"
                height="48"
                fill="none"
                stroke="#6c757d"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file-text"
                viewBox="0 0 24 24"
              >
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
              <p>No notes yet</p>
              <p>Create your first note to start building your knowledge base.</p>
            </div>
          ) : (
            <div className="notes-list-container">
              {notes.map(note => (
                <div key={note.id} className="note-card">
                  <div className="note-actions">
                    <button aria-label="Edit note" title="Edit note" onClick={() => window.location.href = '/newnote'}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1.439 1.439-2.122-2.122 1.439-1.439a.5.5 0 0 1 .706 0l1.416 1.416zm-2.561 2.56-9.193 9.193a.5.5 0 0 0-.128.196l-1.07 3.21a.25.25 0 0 0 .316.316l3.21-1.07a.5.5 0 0 0 .196-.128l9.193-9.193-2.524-2.524z"/>
                      </svg>
                    </button>
                    <button aria-label="Delete note" title="Delete note" onClick={() => onDelete(note.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 .5-.5z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1 0-2h3.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118z"/>
                      </svg>
                    </button>
                  </div>
                  <h3 className="note-title">{note.title.length > 20 ? note.title.slice(0, 20) + '...' : note.title}</h3>
                  <p className="note-tags">{note.tags}</p>
                  <p className="note-content">{note.content.length > 30 ? note.content.slice(0, 30) + '...' : note.content}</p>
                  <p className="note-date">📅 {formatDate(note.date)}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NotesList;

