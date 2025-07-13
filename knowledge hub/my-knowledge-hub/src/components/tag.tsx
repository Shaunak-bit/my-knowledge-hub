import React, { useState, useEffect, useRef } from 'react';
import './tag.css';
import NewTagModal from './NewTagModal';
import { useNotes } from '../NotesContext';
import { useBookmarks } from '../BookmarksContext';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../TagsContext';

interface TagUsage {
  name: string;
  color: string;
  notesCount: number;
  bookmarksCount: number;
  totalUsage: number;
}

const Tag: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [tagsUsage, setTagsUsage] = useState<TagUsage[]>([]);
  const { notes } = useNotes();
  const { bookmarks } = useBookmarks();
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // For simplicity, assign colors to tags from a fixed palette
  const colors = ['#9D7CBF', '#3AB0FF', '#00C49A', '#FFBB28', '#FF8042', '#FF6666'];

  // Helper to get color for a tag name
  const getColorForTag = (tagName: string): string => {
    const index = tagName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Aggregate tags from notes and bookmarks with usage counts
  useEffect(() => {
    const tagMap: { [key: string]: TagUsage } = {};

    // Count tags in notes
    notes.forEach(note => {
      const noteTags = Array.isArray(note.tags) ? note.tags : note.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      noteTags.forEach((tag: string) => {
        if (!tagMap[tag]) {
          tagMap[tag] = { name: tag, color: getColorForTag(tag), notesCount: 0, bookmarksCount: 0, totalUsage: 0 };
        }
        tagMap[tag].notesCount += 1;
        tagMap[tag].totalUsage += 1;
      });
    });

    // Count tags in bookmarks
    bookmarks.forEach(bookmark => {
      const bookmarkTags = Array.isArray(bookmark.tags) ? bookmark.tags : bookmark.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
      bookmarkTags.forEach((tag: string) => {
        if (!tagMap[tag]) {
          tagMap[tag] = { name: tag, color: getColorForTag(tag), notesCount: 0, bookmarksCount: 0, totalUsage: 0 };
        }
        tagMap[tag].bookmarksCount += 1;
        tagMap[tag].totalUsage += 1;
      });
    });

    setTagsUsage(Object.values(tagMap));
  }, [notes, bookmarks]);

  const { addTag } = useTags();

  const handleCreateTag = (tagName: string, color: string) => {
    addTag({ name: tagName, color });
    setShowModal(false);
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
          <button className="dark-mode-toggle" aria-label="Toggle dark mode">
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z"></path></svg>
          </button>
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
            <li>
              <a href="/dashboard">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
              </a>
            </li>
            <li>
              <a href="/notes">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                Notes
              </a>
            </li>
            <li>
              <a href="/bookmarks">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
                Bookmarks
              </a>
            </li>
            <li>
              {/* <a href="/search">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Search
              </a> */}
            </li>
            <li className="active">
              <a href="/tags">
                <svg width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag" viewBox="0 0 24 24"><path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path><circle cx="16.5" cy="7.5" r="1.5"></circle></svg>
                Tags
              </a>
            </li>
            <li>
              {/* <a href="/settings">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z"></path></svg>
                Settings
              </a> */}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="user-info">
          <h1>Tags</h1>
          <p>Organize your content with custom tags</p>
          <button className="new-tag-btn" onClick={() => setShowModal(true)}>+ New Tag</button>
        </header>
        <div className="tag-list">
          {tagsUsage.length === 0 ? (
            <div className="tag-empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" className="tag-icon" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z" />
                <circle cx="16.5" cy="7.5" r="1.5" />
              </svg>
              <h2>No tags yet</h2>
              <p>Create your first tag to start organizing your notes and bookmarks.</p>
              <button className="create-first-tag-btn" onClick={() => setShowModal(true)}>+ Create First Tag</button>
            </div>
          ) : (
            tagsUsage.map((tag) => (
              <div key={tag.name} className="tag-card">
                <div className="tag-color" style={{ backgroundColor: tag.color }}></div>
                <div className="tag-info">
                  <h3>{tag.name}</h3>
                  <p>Notes: {tag.notesCount}</p>
                  <p>Bookmarks: {tag.bookmarksCount}</p>
                  <p><strong>Total usage:</strong> {tag.totalUsage}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {showModal && (
          <NewTagModal
            onClose={() => setShowModal(false)}
            onCreate={handleCreateTag}
          />
        )}
      </main>
    </div>
  );
};

export default Tag;

