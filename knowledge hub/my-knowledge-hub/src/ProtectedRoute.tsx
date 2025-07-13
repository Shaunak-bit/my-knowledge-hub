import type { ReactElement } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userEmail } = useAuth();

  if (!userEmail) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
