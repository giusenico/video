import React from 'react';
import { useAuth } from '../context/AuthContext';
import Login from './Login';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, login } = useAuth();

  // If user is not authenticated, show login screen
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  // If user is authenticated, show the protected content
  return children;
};

export default ProtectedRoute;