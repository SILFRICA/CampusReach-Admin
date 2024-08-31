import React, { createContext, useEffect, useState } from 'react';

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
  updateUser: (newData: Partial<UserDataProps>) => void;
  logout: () => void;
  userData: any;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: () => {},
  updateUser: () => {},
  logout: () => {},
  userData: {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? true : false;
      });

      const [userData, setUserData] = useState<UserDataProps | object>(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : {};
      });

  const login = (data: UserDataProps) => {
    sessionStorage.setItem('userData', JSON.stringify(data));
    setIsAuthenticated(true);
    setUserData(data);
  };

  const updateUser = (data: Partial<UserDataProps>) => {
    setUserData((prevState) => {
        if (!prevState) return {};

        const updatedUserData = {
          ...prevState,
          user: {
            ...prevState,
            ...data,
          },
        };

        sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
        return updatedUserData;
      });
  };

  const logout = () => {
    sessionStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUserData({});
  };

  useEffect(() => {
    if (!isAuthenticated || !userData) {
      setIsAuthenticated(false);
      sessionStorage.removeItem('userData');
    }
  }, [userData, isAuthenticated]);

  const authContextValue = {
    isAuthenticated,
    login,
    updateUser,
    logout,
    userData,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
