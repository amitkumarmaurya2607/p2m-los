"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <ThemeProvider>
          <ToastProvider />
          {children}
        </ThemeProvider>
      </ApplicationProvider>
    </AuthProvider>
  );
}
