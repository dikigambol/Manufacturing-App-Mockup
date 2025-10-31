import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [selectedLine, setSelectedLine] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing user session
        const userData = localStorage.getItem('user');
        const lineData = localStorage.getItem('selectedLine');

        if (userData) {
            setUser(JSON.parse(userData));
        }

        if (lineData) {
            setSelectedLine(lineData);
        }

        setIsLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setSelectedLine(null);
        localStorage.removeItem('user');
        localStorage.removeItem('selectedLine');
    };

    const selectLine = (lineId) => {
        setSelectedLine(lineId);
        localStorage.setItem('selectedLine', lineId);
    };

    const isAuthenticated = () => {
        return user !== null;
    };

    const hasSelectedLine = () => {
        return selectedLine !== null;
    };

    const getCurrentUser = () => {
        return user;
    };

    const getCurrentLine = () => {
        return selectedLine;
    };

    return (
        <AuthContext.Provider value={{
            user,
            selectedLine,
            isLoading,
            login,
            logout,
            selectLine,
            isAuthenticated,
            hasSelectedLine,
            getCurrentUser,
            getCurrentLine
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
