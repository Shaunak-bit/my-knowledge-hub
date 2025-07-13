import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './search.css';
import { NotesContext } from '../NotesContext';

const SearchPage: React.FC = () => {
  const { notes, bookmarks, tags } = useContext(NotesContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchIn, setSearchIn] = useState<'all' | 'notes' | 'bookmarks'>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    let filteredResults: Array<any> = [];

    const term = searchTerm.toLowerCase();

    const tagFilter = filterTag.toLowerCase();

    if (searchIn === 'all' || searchIn === 'notes') {
      const filteredNotes = notes.filter(note => {
        const matchesTerm =
          note.title.toLowerCase().includes(term) ||
          note.content.toLowerCase().includes(term) ||
          note.tags.some((tag: string) => tag.toLowerCase().includes(term));
        const matchesTag = filterTag === 'all' || note.tags.some((tag: string) => tag.toLowerCase() === tagFilter);
        return matchesTerm && matchesTag;
      }).map(note => ({ ...note, type: 'note' }));
      filteredResults = filteredResults.concat(filteredNotes);
    }

    if (searchIn === 'all' || searchIn === 'bookmarks') {
      const filteredBookmarks = bookmarks.filter(bookmark => {
        const matchesTerm =
          bookmark.title.toLowerCase().includes(term) ||
          bookmark.description.toLowerCase().includes(term) ||
          bookmark.url.toLowerCase().includes(term) ||
          bookmark.tags.some((tag: string) => tag.toLowerCase().includes(term));
        const matchesTag = filterTag === 'all' || bookmark.tags.some((tag: string) => tag.toLowerCase() === tagFilter);
        return matchesTerm && matchesTag;
      }).map(bookmark => ({ ...bookmark, type: 'bookmark' }));
      filteredResults = filteredResults.concat(filteredBookmarks);
    }

    // Sort by date descending (assuming each item has a 'date' field)
    filteredResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setResults(filteredResults);
  }, [searchTerm, searchIn, filterTag, notes, bookmarks]);

  return (
    <div className="search-page">
      <header className="search-header">
        <h1>Search</h1>
        <p>Find anything in your knowledge base</p>
      </header>
      <div className="search-controls">
        <input
          type="text"
          placeholder="Search your notes and bookmarks"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={searchIn} onChange={e => setSearchIn(e.target.value as any)} className="search-select">
          <option value="all">All items</option>
          <option value="notes">Notes only</option>
          <option value="bookmarks">Bookmarks only</option>
        </select>
        <select value={filterTag} onChange={e => setFilterTag(e.target.value)} className="search-select">
          <option value="all">All tags</option>
          {tags.map((tag: string) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <div className="search-results">
        {results.length === 0 ? (
          <div className="search-empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h2>Start searching</h2>
            <p>Enter a search term or select a tag to find your notes and bookmarks.</p>
          </div>
        ) : (
          results.map((item, index) => (
            <div key={index} className="search-result-item">
              <div className={`result-type-badge ${item.type}`}>
                {item.type === 'note' ? 'Note' : 'Bookmark'}
              </div>
              <h3 className="result-title">{item.title}</h3>
              <p className="result-preview">{item.type === 'note' ? item.content.slice(0, 100) : item.description.slice(0, 100)}</p>
              <div className="result-tags">
                {item.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="result-tag">{tag}</span>
                ))}
              </div>
              <div className="result-date">{new Date(item.date).toLocaleDateString()}</div>
              {item.type === 'note' ? (
                <Link to={`/notes/edit/${item.id}`} className="result-link">Edit Note</Link>
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="result-link">Visit Bookmark</a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
