// Authentication context for managing admin auth state
import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeToAuthState, getCurrentAdmin } from '../services/authService';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let unsubscribe = null;

    const initializeAuth = async () => {
      try {
        // Check for current user first
        const currentUser = await getCurrentAdmin();
        setUser(currentUser);
        
        // Then subscribe to auth state changes
        unsubscribe = subscribeToAuthState((user) => {
          setUser(user);
          if (!initialized) {
            setInitialized(true);
          }
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
        if (!initialized) {
          setInitialized(true);
        }
      }
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initialized]);

  const value = {
    user,
    loading,
    initialized,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
