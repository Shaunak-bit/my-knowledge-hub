import React from 'react';
import { Link } from 'react-router-dom';
import './search.css';
import { useAuth } from '../AuthContext';  // Import useAuth
const Search: React.FC = () => {
  const { userEmail } = useAuth();

  return (
    <div className="dashboard">
      <header className="top-header">
        <div className="logo">
          <svg width="24" height="24" fill="none" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-brain" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.79 6.22 4.44 7.81"></path><path d="M12 2c5.52 0 10 4.48 10 10 0 3.31-1.79 6.22-4.44 7.81"></path><path d="M12 12v10"></path><path d="M12 12c-1.1 0-2-.9-2-2"></path><path d="M12 12c1.1 0 2-.9 2-2"></path></svg>
          <span>KnowledgeHub</span>
        </div>
        <div className="header-right">
          <button className="dark-mode-toggle" aria-label="Toggle dark mode">
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 0111.21 3 7 7 0 0021 12.79z"></path></svg>
          </button>
          <div className="user-email">
            <svg width="24" height="24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-3-3.87"></path><path d="M4 21v-2a4 4 0 013-3.87"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span>{userEmail}</span>
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
            <li>
              <Link to="/bookmarks">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
                Bookmarks
              </Link>
            </li>
            <li className="active">
              <Link to="/search">
                <svg width="20" height="20" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Search
              </Link>
            </li>
            <li>
              <Link to="/tags">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag" viewBox="0 0 24 24"><path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path><circle cx="16.5" cy="7.5" r="1.5"></circle></svg>
                Tags
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z"></path></svg>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header className="user-info">
          <h1>Search</h1>
          <p>Find anything in your knowledge base</p>
        </header>
        <div className="search-controls">
          <input
            type="text"
            placeholder="Search your notes and bookmarks..."
            className="search-input"
          />
          <select className="search-filter">
            <option>All items</option>
          </select>
          <select className="search-filter">
            <option>All tags</option>
          </select>
        </div>
        <div className="search-empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="gray"
            strokeWidth={1.5}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <h2>Start searching</h2>
          <p>Enter a search term or select a tag to find your notes and bookmarks.</p>
        </div>
      </main>
    </div>
  );
};

export default Search;
