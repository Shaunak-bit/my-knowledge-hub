import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

interface Tag {
  _id?: string;
  name: string;
  color: string;
}

interface TagsContextType {
  tags: Tag[];
  addTag: (tag: Tag) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const TagsContext = createContext<TagsContextType | undefined>(undefined);

export const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error('useTags must be used within a TagsProvider');
  }
  return context;
};

export const TagsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch tags from backend on mount
  useEffect(() => {
    const fetchTags = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await axios.get('/api/tags', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTags(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch tags');
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, [token]);

  // Add tag via backend API and update state
  const addTag = async (tag: Tag) => {
    if (!token) {
      setError('User not authenticated');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        '/api/tags',
        { name: tag.name, color: tag.color },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTags(prevTags => [...prevTags, response.data]);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add tag');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TagsContext.Provider value={{ tags, addTag, loading, error }}>
      {children}
    </TagsContext.Provider>
  );
};
