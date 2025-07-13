import React, { useState } from 'react';
import './AddBookmarkModal.css';

interface AddBookmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (bookmark: { title: string; url: string; description: string; tags: string[] }) => void;
}

const AddBookmarkModal: React.FC<AddBookmarkModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    onAdd({ title, url, description, tags: tagsArray });
    setTitle('');
    setUrl('');
    setDescription('');
    setTags('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <h2>Add New Bookmark</h2>
        <form onSubmit={handleSubmit} className="add-bookmark-form">
          <label>
            Title *
            <input
              type="text"
              placeholder="Enter bookmark title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            URL *
            <input
              type="url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <textarea
              placeholder="Optional description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Tags
            <input
              type="text"
              placeholder="Add tags..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </label>
          <div className="form-buttons">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-btn">Add Bookmark</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
