import React, { createContext, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { successToast } from "../components/Toast";

interface AuthContextType {
  isLoggedIn: boolean,
  login: () => void,
  logout: () => void,
  userName?: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AutoRedirect = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(sessionStorage.getItem("isLogged")),
  );

  const userName = () => {
    const user = JSON.parse(sessionStorage.getItem('user_data') as string);
    return user.username;
  }

  const login = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem("isLogged", "true");
  };

  const logout = async () => {
    successToast("Logout efetuado com sucesso.");
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

