"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";
import { logError } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError(error.message, {
      context: { route: "dashboard", digest: error.digest },
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="text-destructive" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-text-heading">Something went wrong</h2>
        <p className="text-text-secondary">
          {error.message || "An error occurred while processing your application"}
        </p>
        {error.digest && (
          <p className="text-xs font-mono text-text-muted bg-surface-muted px-2 py-1 rounded inline-block">
            Error ID: {error.digest}
          </p>
        )}
        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-surface border border-border rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-muted active:scale-95 transition-all"
          >
            <Home size={18} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
