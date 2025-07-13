import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import useAuth
import './registerpage.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUserEmail } = useAuth();  // Get setUserEmail from context

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || (data.errors && data.errors[0].msg) || 'Registration failed';
        setError(errorMsg);
        return;
      }

      localStorage.setItem('token', data.token);

      // Set the user email in context
      setUserEmail(email);

      navigate('/dashboard');
    } catch (error) {
      setError('An error occurred during registration');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>KnowledgeHub</h1>
      <h2>Create your account</h2>
      <p>Start organizing your knowledge today</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-field"
        />

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
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="input-field"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn">
          Create account
        </button>
      </form>
      <p>
        Already have an account?{' '}
        <a href="/login" className="link">
          Sign in here
        </a>
      </p>
    </div>
  );
}

export default RegisterPage;
