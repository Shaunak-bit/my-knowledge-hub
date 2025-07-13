import React from 'react';
import './WelcomePage.css';
import { useNavigate } from 'react-router-dom';

// Header Component
const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">KnowledgeHub</div>
      <button className="sign-in" onClick={() => navigate('/login')}>Sign In</button>
    </header>
  );
};

// Hero Component
const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Your Personal Knowledge Hub</h1>
        <p>Capture, organize, and discover your ideas with a beautiful, intuitive platform designed for modern knowledge workers. Notes, bookmarks, and insights - all in one place.</p>
        <button className="get-started" onClick={() => navigate('/register')}>Get Started Free</button>
        <button className="sign-in" onClick={() => navigate('/login')}>Sign In</button>
      </div>
    </section>
  );
};

// Features Component
const Features: React.FC = () => {
  return (
    <section className="features">
      <h2>Everything you need to organize your knowledge</h2>
      <p>Powerful features designed to help you capture, organize, and find your information effortlessly.</p>
      <div className="feature-list">
        <div className="feature-item">
          <div className="feature-icon">📝</div>
          <h3>Rich Note Taking</h3>
          <p>Create and organize beautiful notes with our powerful rich text editor.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔖</div>
          <h3>Smart Bookmarks</h3>
          <p>Save and categorize your favorite web resources with detailed descriptions.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔍</div>
          <h3>Instant Search</h3>
          <p>Find anything in your knowledge base with lightning-fast search capabilities.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🏷️</div>
          <h3>Flexible Tagging</h3>
          <p>Organize your content with tags and create your own classification system.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Built for speed with instant loading and real-time updates.</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔒</div>
          <h3>Secure & Private</h3>
          <p>Your personal knowledge base is completely private and secure.</p>
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction: React.FC = () => {
  return (
    <section className="cta">
      <h2>Ready to organize your knowledge?</h2>
      <p>Join thousands of users who have transformed how they capture and organize information.</p>
      <button className="start-hub">Start Your Knowledge Hub</button>
    </section>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Features />
      <CallToAction />
    </div>
  );
};

export default App;