import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

interface Bookmark {
  _id?: string;
  userEmail: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  date: Date;
}

interface BookmarksContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Omit<Bookmark, '_id' | 'userEmail' | 'date'>) => Promise<void>;
  updateBookmark: (id: string, updatedBookmark: Partial<Bookmark>) => Promise<void>;
  deleteBookmark: (id: string) => Promise<void>;
  tags: string[];
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

const API_URL = 'http://localhost:5000/api/bookmarks';

export const useBookmarks = () => {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
};

export const BookmarksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { userEmail } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

 useEffect(() => {
  const fetchBookmarks = async () => {
    if (!userEmail) return;
    try {
      const response = await axios.get(`${API_URL}?userEmail=${encodeURIComponent(userEmail)}`);

      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };
  fetchBookmarks();
}, [userEmail]);


  const addBookmark = async (bookmark: Omit<Bookmark, '_id' | 'userEmail' | 'date'>) => {
    if (!userEmail) return;
    try {
      const response = await axios.post(API_URL, { ...bookmark, userEmail });
      setBookmarks(prev => [response.data, ...prev]);
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const updateBookmark = async (id: string, updatedBookmark: Partial<Bookmark>) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedBookmark);
      setBookmarks(prev => prev.map(bm => (bm._id === id ? response.data : bm)));
    } catch (error) {
      console.error('Error updating bookmark:', error);
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBookmarks(prev => prev.filter(bm => bm._id !== id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  // Extract unique tags from bookmarks
  const tagsSet = new Set<string>();
  bookmarks.forEach(bm => bm.tags.forEach(tag => tagsSet.add(tag)));
  const tags = Array.from(tagsSet);

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, updateBookmark, deleteBookmark, tags }}>
      {children}
    </BookmarksContext.Provider>
  );
};
