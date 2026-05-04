"use client";

import { ReduxProvider } from "@/components/ReduxProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <ToastProvider />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}