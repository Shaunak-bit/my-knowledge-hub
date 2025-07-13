import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNotes } from '../NotesContext';
import './newnote.css';
import './newnoteContent.css';



interface NewNoteProps {
  note?: {
    id: string;
    title: string;
    tags: string;
    content: string;
  };
  onSave: (note: { title: string; tags: string; content: string }) => void;
  onCancel: () => void;
  onDelete?: () => void;
}

const NewNote: React.FC<NewNoteProps> = ({ note, onSave, onCancel, onDelete }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [tags, setTags] = useState(note ? note.tags : '');
  const [content, setContent] = useState(note ? note.content : '');
  const location = useLocation();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTags(note.tags);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required');
      return;
    }
    onSave({ title, tags, content });
  };

  const handleBack = () => {
    onCancel();
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    
    <div className="newnote-page">
      <aside className="sidebar">
        <nav>
          <ul>
            <li className={isActive('/dashboard')}>
              <Link to="/dashboard">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                Dashboard
              </Link>
            </li>
            <li className={isActive('/notes')}>
              <Link to="/notes">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><path d="M14 2v6h6"></path><path d="M16 13H8"></path><path d="M16 17H8"></path><path d="M10 9H8"></path></svg>
                Notes
              </Link>
            </li>
            <li className={isActive('/bookmarks')}>
              <Link to="/bookmarks">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"></path></svg>
                Bookmarks
              </Link>
            </li>
            <li className={isActive('/search')}>
              {/* <Link to="/search">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                Search
              </Link> */}
            </li>
            <li className={isActive('/tags')}>
              <Link to="/tags">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-tag" viewBox="0 0 24 24"><path d="M20 12v7a2 2 0 01-2 2h-7l-7-7 7-7h7a2 2 0 012 2z"></path><circle cx="16.5" cy="7.5" r="1.5"></circle></svg>
                Tags
              </Link>
            </li>
            <li className={isActive('/settings')}>
              {/* <Link to="/settings">
                <svg width="20" height="20" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51z"></path></svg>
                Settings
              </Link> */}
            </li>
          </ul>
        </nav>
      </aside>
      <main className="newnote-main">
        <header className="newnote-header">
          <button className="back-button" onClick={handleBack} aria-label="Go back">
            &#8592;
          </button>
          <h1>Edit Note</h1>
          <div className="header-actions">
            {onDelete && <button className="delete-button" onClick={onDelete}>Delete</button>}
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </header>
        <form className="newnote-form" onSubmit={e => e.preventDefault()}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter note title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            type="text"
            placeholder="Add tags to organize your note..."
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
          <label htmlFor="content">Content</label>
          <div className="content-toolbar">
            <button type="button" aria-label="Bold"><b>B</b></button>
            <button type="button" aria-label="Italic"><i>I</i></button>
            <button type="button" aria-label="Underline"><u>U</u></button>
            <button type="button" aria-label="Bullet list">&bull;</button>
            <button type="button" aria-label="Numbered list">1.</button>
            <button type="button" aria-label="Insert link">&#128279;</button>
          </div>
          <textarea
            id="content"
            className="content-textarea"
            placeholder="Start writing your note..."
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </form>
      </main>
    </div>
  );
};

export default NewNote;
