import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // Check if user is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuth = localStorage.getItem('tvflix_auth');
    return storedAuth ? JSON.parse(storedAuth).isAuthenticated : false;
  });

  const [username, setUsername] = useState(() => {
    const storedAuth = localStorage.getItem('tvflix_auth');
    return storedAuth ? JSON.parse(storedAuth).username : '';
  });

  // Login function
  const login = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
    // Store auth state in localStorage
    localStorage.setItem('tvflix_auth', JSON.stringify({
      isAuthenticated: true,
      username
    }));
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    setUsername('');
    // Remove auth state from localStorage
    localStorage.removeItem('tvflix_auth');
  };

  // Value to provide through the context
  const value = {
    isAuthenticated,
    username,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;