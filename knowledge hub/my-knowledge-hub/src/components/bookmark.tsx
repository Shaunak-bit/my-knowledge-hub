import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddBookmarkModal from './AddBookmarkModal';
import { useAuth } from '../AuthContext';
import { useBookmarks } from '../BookmarksContext';  // Import useBookmarks from context
import './bookmark.css';

const Bookmark: React.FC = () => {
  const { userEmail, logout } = useAuth();
  const { bookmarks, addBookmark, updateBookmark, deleteBookmark } = useBookmarks();  // Get bookmarks and actions from context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddBookmark = (bookmark: { title: string; url: string; description: string; tags: string[] }) => {
    addBookmark(bookmark);
    closeModal();
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
        <div className="header-right" ref={dropdownRef}>
          <button className="dark-mode-toggle" aria-label="Toggle dark mode">
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z"></path></svg>
          </button>
          <div className="user-email" onClick={toggleDropdown} style={{ cursor: 'pointer', position: 'relative' }}>
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-3-3.87"></path><path d="M4 21v-2a4 4 0 013-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>{userEmail}</span>
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
        </div>
      </header>
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/notes">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                Notes
              </Link>
            </li>
            <li className="active">
              <Link to="/bookmarks">
                <svg width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
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
      <main className="main-content">
        <header className="user-info">
          <h1>My Bookmarks</h1>
          <p>{bookmarks.length} bookmarks</p>
        </header>
        <div className="bookmark-controls">
          <input
            type="text"
            placeholder="Search bookmarks..."
            className="bookmark-search"
          />
          <select className="bookmark-filter">
            <option>All tags</option>
          </select>
          <button className="add-bookmark-btn" onClick={openModal}>+ Add Bookmark</button>
        </div>
        {bookmarks.length === 0 ? (
          <div className="bookmark-empty-state">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="bookmark-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="gray"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5v14l7-5 7 5V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
              />
            </svg>
            <h2>No bookmarks yet</h2>
            <p>Save your first bookmark to start building your resource collection.</p>
            <button className="add-first-bookmark-btn" onClick={openModal}>+ Add First Bookmark</button>
          </div>
        ) : (
          <div className="bookmark-container">
            <div className="bookmark-list">
              {bookmarks.map((bookmark, index) => (
                <div key={index} className="bookmark-card">
                  <div className="bookmark-card-header">
                    <h3 className="bookmark-title">{bookmark.title}</h3>
                    <div className="bookmark-actions">
                      <button className="bookmark-action-btn" title="Open Link" onClick={() => window.open(bookmark.url, '_blank')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="16" height="16"><path d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6"></path><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path></svg>
                      </button>
                      <button className="bookmark-action-btn" title="Edit Bookmark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="16" height="16"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"></path></svg>
                      </button>
                      <button className="bookmark-action-btn" title="Delete Bookmark">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="16" height="16"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"></path></svg>
                      </button>
                    </div>
                  </div>
                  <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="bookmark-url" title={bookmark.url}>{bookmark.url}</a>
                  <p className="bookmark-description">{bookmark.description}</p>
                  <div className="bookmark-tags">
                    {Array.isArray(bookmark.tags) ? bookmark.tags.map((tag, idx) => (
                      <span key={idx} className="bookmark-tag">{tag.trim()}</span>
                    )) : null}
                  </div>
                  <div className="bookmark-date">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="16" height="16" style={{marginRight: '6px'}}>
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span>Yesterday</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <AddBookmarkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAdd={handleAddBookmark}
      />
    </div>
  );
};
export default Bookmark;
