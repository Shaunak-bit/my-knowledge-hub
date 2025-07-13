import React, { useState } from 'react';
import './NewTagModal.css';

interface NewTagModalProps {
  onClose: () => void;
  onCreate: (tagName: string, color: string) => void;
}

const colors = [
  '#2563eb', '#10b981', '#8b5cf6', '#ec4899',
  '#f59e0b', '#6366f1', '#ef4444', '#14b8a6'
];

const NewTagModal: React.FC<NewTagModalProps> = ({ onClose, onCreate }) => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleCreate = () => {
    if (tagName.trim() === '') {
      alert('Tag name is required');
      return;
    }
    onCreate(tagName, selectedColor);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <h2>Create New Tag</h2>
        <label htmlFor="tagName">Tag Name *</label>
        <input
          id="tagName"
          type="text"
          placeholder="Enter tag name"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
        />
        <label>Color</label>
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              role="button"
              tabIndex={0}
              aria-label={`Select color ${color}`}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedColor(color); }}
            />
          ))}
        </div>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="create-btn" onClick={handleCreate}>Create Tag</button>
        </div>
      </div>
    </div>
  );
};

export default NewTagModal;
