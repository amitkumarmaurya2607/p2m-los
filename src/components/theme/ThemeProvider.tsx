"use client";

import { createContext, useContext, useCallback, useState, useEffect, type ReactNode } from "react";
import type { Theme } from "@/types";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const defaultValue: ThemeContextValue = {
  theme: "light",
  toggleTheme: () => {},
  mounted: false,
};

const ThemeContext = createContext<ThemeContextValue>(defaultValue);

function getStoredTheme() {
  if (typeof window === "undefined") return "light" as Theme;
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "light" as Theme;
  } catch {
    return "light" as Theme;
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setMounted(true);
    const stored = getStoredTheme();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        const newTheme = (e.newValue === "dark" ? "dark" : "light") as Theme;
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
