import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import useAuth
import './registerpage.css'; // Reuse the same CSS for consistency

const SignPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useAuth();  // Get setUserEmail from context

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // TODO: Add sign-in logic here (e.g., API call)

    // Set the user email in context
    setUserEmail(email);

    // Navigate to dashboard after "sign-in"
    navigate('/dashboard');
  };

  return (
    <div className="register-container">
      <h1>KnowledgeHub</h1>
      <h2>Welcome back</h2>
      <p>Sign in to your knowledge hub</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn">
          Sign in
        </button>
      </form>
      <p>
        Don't have an account?{' '}
        <a href="/register" className="link">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default SignPage;
