"use client";

import { useEffect } from "react";
import { logError } from "@/lib/logger";

export function GlobalErrorHandler() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      logError(event.message, {
        stack: event.error?.stack,
        url: window.location.href,
      });
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const message =
        event.reason instanceof Error ? event.reason.message : String(event.reason);
      logError(message, {
        stack: event.reason instanceof Error ? event.reason.stack : undefined,
        url: window.location.href,
        context: { type: "unhandledrejection" },
      });
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return null;
}
