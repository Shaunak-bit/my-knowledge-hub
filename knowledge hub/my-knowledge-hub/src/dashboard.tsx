import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './dashboard.css';
import { useAuth } from './AuthContext';
import { useNotes } from './NotesContext';
import { useBookmarks } from './BookmarksContext';
import { useTags } from './TagsContext';
import NewTagModal from './components/NewTagModal';

const Dashboard: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const { notes } = useNotes();
  const { bookmarks } = useBookmarks();
  const { tags, addTag } = useTags();
  const navigate = useNavigate();

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleCreateNote = () => {
    navigate('/notes');
  };

  const openTagModal = () => {
    setIsTagModalOpen(true);
  };

  const closeTagModal = () => {
    setIsTagModalOpen(false);
  };

  const handleCreateTag = (tagName: string, color: string) => {
    addTag({ name: tagName, color });
    closeTagModal();
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  let currentPath = window.location.pathname;
  // Normalize currentPath by removing trailing slash if present
  if (currentPath.length > 1 && currentPath.endsWith('/')) {
    currentPath = currentPath.slice(0, -1);
  }

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
      <aside className="sidebar">
        <nav>
          <ul>
            <li className={currentPath === '/dashboard' ? 'active' : ''}>
              <Link to="/dashboard">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                  viewBox="0 0 24 24"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Dashboard
              </Link>
            </li>
            <li className={currentPath === '/notes' ? 'active' : ''}>
              <Link to="/notes">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#374151"
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
                Notes
              </Link>
            </li>
            <li className={currentPath === '/bookmarks' ? 'active' : ''}>
              <Link to="/bookmarks">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bookmark"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path>
                </svg>
              Bookmarks
              </Link>
            </li>
            <li className={currentPath === '/search' ? 'active' : ''}>
              {/* <Link to="/search">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-search"
                  viewBox="0 0 24 24"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              Search
              </Link> */}
            </li>
            <li className={currentPath === '/tags' ? 'active' : ''}>
              <Link to="/tags">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-tag"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path>
                  <circle cx="16.5" cy="7.5" r="1.5"></circle>
                </svg>
              Tags
              </Link>
            </li>
            <li className={currentPath === '/settings' ? 'active' : ''}>
              {/* <Link to="/settings">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-settings"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z"></path>
              </svg>
              Settings
              </Link> */}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="user-info">
          <h1>Welcome back, {userEmail}!</h1>
          <p>Here's what's happening in your knowledge hub.</p>
        </header>
        <div className="stats">
          <div className="stat-item notes">
            <div className="icon notes-icon">
              <svg width="24" height="24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
            </div>
            <div className="label">
              <div className="count">{notes.length}</div>
              <div>Notes</div>
            </div>
          </div>
          <div className="stat-item bookmarks">
            <div className="icon bookmarks-icon">
              <svg width="24" height="24" fill="none" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
            </div>
            <div className="label">
              <div className="count">{bookmarks.length}</div>
              <div>Bookmarks</div>
            </div>
          </div>
          <div className="stat-item tags">
            <div className="icon tags-icon">
              <svg width="24" height="24" fill="none" stroke="#9D7CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag" viewBox="0 0 24 24"><path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path><circle cx="16.5" cy="7.5" r="1.5"></circle></svg>
            </div>
            <div className="label">
              <div className="count">{tags.length}</div>
              <div>Tags</div>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="create-note" onClick={handleCreateNote}>
            <svg width="24" height="24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <div>
              <div className="action-title">Create New Note</div>
              <div className="action-desc">Capture your thoughts and ideas</div>
            </div>
          </button>
          <button className="add-bookmark" onClick={() => navigate('/bookmarks')}>
            <svg width="24" height="24" fill="none" stroke="#198754" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <div>
              <div className="action-title">Add Bookmark</div>
              <div className="action-desc">Save interesting web resources</div>
            </div>
          </button>
          <button className="add-tag" onClick={openTagModal}>
            <svg width="24" height="24" fill="none" stroke="#9D7CBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <div>
              <div className="action-title">Add Tag</div>
              <div className="action-desc">Create a new tag</div>
            </div>
          </button>
        </div>
        {isTagModalOpen && (
          <NewTagModal onClose={closeTagModal} onCreate={handleCreateTag} />
        )}
        <div className="recent">
          <div className="recent-item">
            <div className="recent-header">
              <h2>Recent Notes</h2>
              <a href="/notes" className="view-all">View all</a>
            </div>
            <div className="recent-content">
              <svg width="48" height="48" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
              <p>No notes yet. Create your first note to get started!</p>
            </div>
          </div>
          <div className="recent-item">
            <div className="recent-header">
              <h2>Recent Bookmarks</h2>
              <a href="/bookmarks" className="view-all">View all</a>
            </div>
            <div className="recent-content">
              <svg width="48" height="48" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
              <p>No bookmarks yet. Save your first bookmark to get started!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;