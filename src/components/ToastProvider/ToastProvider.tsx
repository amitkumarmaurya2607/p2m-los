// components/ui/ToastProvider.tsx
"use client";
import { Toaster } from "react-hot-toast";

function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        className: "rounded-xl shadow-lg border border-border text-sm px-4 py-3",
        style: {
          background: "var(--surface)",
          color: "var(--text-primary)",
        },
        success: {
          iconTheme: {
            primary: "var(--success)",
            secondary: "var(--success-foreground)",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--destructive)",
            secondary: "var(--destructive-foreground)",
          },
        },
      }}
    />
  );
}

export default ToastProvider;
