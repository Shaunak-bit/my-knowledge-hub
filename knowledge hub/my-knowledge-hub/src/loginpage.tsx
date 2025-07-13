import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const LoginPage: React.FC = () => {
  const { setUserEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform your login logic here, e.g., API call to authenticate user
    // If login successful:
    setUserEmail(email);
    // Redirect or update UI accordingly
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
