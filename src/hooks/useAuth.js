import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null);
  const navigate = useNavigate();

  const login = async (token) => {
    setToken(token);
    navigate('/config');
  };
  const logout = () => {
    setToken(null);
    navigate('/', { replace: true });
  };

  const value = { token, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
