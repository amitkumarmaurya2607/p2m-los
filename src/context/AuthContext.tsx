"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface AuthUser {
  method: "mobile" | "email";
  identifier: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadAuth(): { isLoggedIn: boolean; user: AuthUser | null } {
  if (typeof window === "undefined") return { isLoggedIn: false, user: null };
  try {
    const raw = sessionStorage.getItem("p2m-auth");
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        isLoggedIn: parsed.isLoggedIn ?? false,
        user: parsed.user ?? null,
      };
    }
  } catch {
    /* ignore */
  }
  return { isLoggedIn: false, user: null };
}

function saveAuth(isLoggedIn: boolean, user: AuthUser | null) {
  try {
    sessionStorage.setItem("p2m-auth", JSON.stringify({ isLoggedIn, user }));
  } catch {
    /* ignore */
  }
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ isLoggedIn, user }, setState] = useState(loadAuth);

  const login = useCallback((userData: AuthUser) => {
    setState({ isLoggedIn: true, user: userData });
    saveAuth(true, userData);
  }, []);

  const logout = useCallback(() => {
    setState({ isLoggedIn: false, user: null });
    saveAuth(false, null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
