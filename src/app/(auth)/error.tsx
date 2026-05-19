"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { logError } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AuthError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError(error.message, {
      context: { route: "auth", digest: error.digest },
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <div
          className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center
            justify-center"
        >
          <AlertCircle className="text-destructive" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-heading">Something went wrong</h2>
        <p className="text-text-secondary">{error.message || "An unexpected error occurred"}</p>
        {error.digest && (
          <p
            className="text-xs font-mono text-text-muted bg-surface-muted px-2 py-1 rounded
              inline-block"
          >
            Error ID: {error.digest}
          </p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center
            justify-center gap-2 mx-auto shadow-lg shadow-primary/20 hover:brightness-110
            active:scale-95 transition-all"
        >
          <RefreshCcw size={18} />
          Try Again
        </button>
      </div>
    </div>
  );
}
