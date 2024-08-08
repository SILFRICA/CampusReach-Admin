import React, { createContext, useState } from 'react';

interface UserDataProps {
    user: object,
    channels_managed: null|number[],
    subchannel_managed: null|number[],
    post_stats: object,
    sub_admins: [],
    pending_admins: [],
    institution: {
        id: number,
        name: string
    }
    token: string
}

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (userData: UserDataProps) => void;
  refresh: (newData: UserDataProps) => void;
  logout: () => void;
  userData: object;
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
  const [userData, setUserData] = useState<UserDataProps|object>({});

  const login = (data: UserDataProps) => {
    setIsAuthenticated(true);
    setUserData(data);
  };

  const refresh = (data: UserDataProps) => {
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
