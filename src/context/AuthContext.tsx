import React, { createContext, ReactNode, useEffect, useState } from 'react';

interface User {
    email: string;
    lastname: ReactNode;
    id: string;
}

interface Institution {
    id: number;
    name: string;
}

interface UserDataProps {
    user: User; // Use the User interface
    institution: Institution; // Use the Institution interface
    token: string;
}

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (userData: UserDataProps) => void;
    updateUser: (newData: Partial<UserDataProps>) => void;
    logout: () => void;
    userData: UserDataProps | null; // Set to null instead of an empty object
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
    isAuthenticated: false,
    login: () => {},
    updateUser: () => {},
    logout: () => {},
    userData: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? true : false;
    });

    const [userData, setUserData] = useState<UserDataProps | null>(() => {
        const storedUserData = sessionStorage.getItem('userData');
        return storedUserData ? JSON.parse(storedUserData) : null; // Default to null
    });

    const login = (data: UserDataProps) => {
        sessionStorage.setItem('userData', JSON.stringify(data));
        setIsAuthenticated(true);
        setUserData(data);
    };

    const updateUser = (data: Partial<UserDataProps>) => {
        setUserData((prevState) => {
            if (!prevState) return null;

            const updatedUserData = {
                ...prevState,
                user: {
                    ...prevState.user,
                    ...data.user, // Update only the user part
                },
            };

            sessionStorage.setItem('userData', JSON.stringify(updatedUserData));
            return updatedUserData;
        });
    };

    const logout = () => {
        sessionStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
    };

    useEffect(() => {
        if (!isAuthenticated || !userData) {
            setIsAuthenticated(false);
            sessionStorage.removeItem('userData');
        }
    }, [userData, isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, updateUser, logout, userData }}>
            {children}
        </AuthContext.Provider>
    );
};
