// src/App.tsx
import React from 'react';
import './App.css';
import Dashboard from './dashboard';
import WelcomePage from './WelcomePage'; // Import the WelcomePage component
import RegisterPage from './registerpage'; // Import RegisterPage component
import SignPage from './signpage'; // Import SignPage component
import NewNotePage from './components/NewNotePage'; // Import NewNotePage component
import Bookmark from './components/bookmark'; // Import Bookmark component
import Search from './components/search'; // Import Search component
import Tag from './components/tag'; // Import Tag component
import NotesList from './components/NotesList'; // Import NotesList component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { NotesProvider } from './NotesContext'; // Import NotesProvider
import { BookmarksProvider } from './BookmarksContext'; // Import BookmarksProvider
import { TagsProvider } from './TagsContext'; // Import TagsProvider

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotesProvider>
        <BookmarksProvider>
          <TagsProvider>
            <Router> {/* Wrap your app with BrowserRouter */}
              <div className="App">
                <Routes> {/* Define routes */}
                  <Route path="/" element={<WelcomePage />} /> {/* Default route */}
                  <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard route */}
                  <Route path="/register" element={<RegisterPage />} /> {/* Register route */}
                  <Route path="/login" element={<SignPage />} /> {/* Login route */}
                  <Route path="/newnote" element={<NewNotePage />} /> {/* NewNote route */}
                  <Route path="/notes" element={<NotesList />} /> {/* Notes list route */}
                  <Route path="/bookmarks" element={<Bookmark />} /> {/* Bookmark route */}
                  <Route path="/search" element={<Search />} /> {/* Search route */}
                  <Route path="/tags" element={<Tag />} /> {/* Tag route */}
                </Routes>
              </div>
            </Router>
          </TagsProvider>
        </BookmarksProvider>
      </NotesProvider>
    </AuthProvider>
  );
};

export default App; 