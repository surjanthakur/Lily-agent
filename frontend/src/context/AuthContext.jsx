// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(undefined);

const AUTH_ME_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${AUTH_ME_URL}/google/auth/me`, {
        withCredentials: true,
      });
      console.info('Current user response received.', { status: response.status });

      // Extract from body
      const { username, email, profile_img } = response.data;

      // Extract from headers (Axios lowercases header names)
      const isAuthHeader = response.headers['is_authenticated'];
      const authenticated = isAuthHeader === 'true';

      setUser({
        username,
        email,
        profile_img: profile_img || null,
      });
      setIsAuthenticated(authenticated);
    } catch (err) {
      console.error('Current user request failed.', {
        status: err.response?.status,
        message: err.message,
      });
      setUser(null);
      setIsAuthenticated(false);

      if (err.response?.status === 401 || err.response?.status === 404) {
        // not logged in – this is expected
        setError(null);
      } else {
        setError(err.message || 'Failed to authenticate user');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    void Promise.resolve().then(fetchCurrentUser);
  }, []);

  const refreshUser = async () => {
    console.log('refresh user executing function');
    setIsLoading(true);
    setError(null);
    await fetchCurrentUser();
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
