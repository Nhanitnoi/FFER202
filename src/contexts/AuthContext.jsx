// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };

    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, loading: false, isAuthenticated: true, user: action.payload };

    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload };

    case 'CLEAR_ERROR':
      return { ...state, error: null };

    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialState };

    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const users = await api.getUsers();
      const foundUser = users.find(
        u =>
          (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
          u.password === password
      );

      if (!foundUser) {
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: foundUser });
      return { success: true, user: foundUser };

    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Network error' });
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
