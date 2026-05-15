"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ApplicationProvider } from "@/context/ApplicationContext";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (

    <ApplicationProvider>
      <ToastProvider />
      {children}
    </ApplicationProvider>

  );
}
