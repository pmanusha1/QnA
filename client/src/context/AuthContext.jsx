import { createContext, useState, useEffect } from "react";
import { getUser } from "../utils/auth";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser.user);
      setToken(storedUser.token);
    }
  }, []);

  const login = (token, user) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
