"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative mx-auto w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="text-destructive" size={48} />
          <div className="absolute -inset-4 bg-destructive/5 rounded-full animate-pulse -z-10" />
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-text-heading tracking-tight">Oops! Something went wrong</h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            {error.message || "An unexpected error occurred while processing your request. Please try again or contact support if the issue persists."}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-text-muted bg-surface-muted px-2 py-1 rounded inline-block">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={reset}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            <RefreshCcw size={20} />
            Try Again
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-4 bg-surface border border-border rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-surface-muted active:scale-95 transition-all"
          >
            <Home size={20} />
            Back to Home
          </Link>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-text-muted">
            Need help? <Link href="/contact" className="text-primary font-bold hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
