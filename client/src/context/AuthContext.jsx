import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && storedUser !== "undefined") {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Invalid user data in localStorage:", e);
                localStorage.removeItem("user");
            }
        }
    }, []);

    // ✅ Login logic: save token + user
    const login = ({ token, user }) => {
        setToken(token);
        setUser(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// ✅ This must be exported to work in your components
export const useAuth = () => useContext(AuthContext);
