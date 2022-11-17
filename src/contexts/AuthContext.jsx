import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({ user: null });

// TODO: start using reducers and actions
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null);
  };

  const login = (user) => {
    setUser(user);
  };

  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const userLocalstorage = localStorage.getItem("user");

    if (userLocalstorage) {
      const { user, token } = JSON.parse(userLocalstorage);

      if (!token) {
        clearUserData();
      }

      const parsedToken = JSON.parse(atob(token.split(".")[1]));

      if (parsedToken.exp * 1000 < new Date()) {
        clearUserData();
      } else {
        setUser(user);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};