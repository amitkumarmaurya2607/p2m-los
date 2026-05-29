"use client";

import { Component, type ReactNode } from "react";
import { Button } from "./ui/Button";
import { logError } from "@/lib/logger";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  label?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, _errorInfo: React.ErrorInfo) {
    console.log("_errorInfo", _errorInfo)
    logError(error.message, {
      context: { component: this.props.label },
      stack: error.stack,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    });

    try {
      fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          level: "error",
          message: error.message,
          source: "client",
          stack: error.stack,
          url: typeof window !== "undefined" ? window.location.href : undefined,
        }),
      });
    } catch {
      // silent fallback
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
          <div className="text-center">
            {this.props.label && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {this.props.label}
              </p>
            )}
            <h2 className="mb-4 text-2xl font-bold text-destructive">Something went wrong</h2>
            <p className="mb-6 text-muted-foreground">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <Button onClick={this.handleReset}>Try again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
