import React, { createContext, useState } from 'react';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: any) => void;
  refresh: (newData: any) => void;
  logout: () => void;
  userData: any;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  refresh: () => {},
  logout: () => {},
  userData: {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (data: any) => {
    setIsAuthenticated(true);
    setUserData(data);
  };

  const refresh = (data: any) => {
    const mergedChange = { ...userData, ...data };
    setUserData(mergedChange);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserData({});
  };

  const authContextValue = {
    isAuthenticated,
    login,
    refresh,
    logout,
    userData,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
