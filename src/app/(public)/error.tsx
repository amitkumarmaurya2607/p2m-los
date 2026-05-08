"use client";

import { Button } from "@/components/ui/Button";



type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Public Pages
        </p>

        <h2 className="mb-4 text-2xl font-bold text-destructive">
          Something went wrong
        </h2>

        <p className="mb-6 text-muted-foreground">
          {error.message || "An unexpected error occurred"}
        </p>

        <Button onClick={reset}>
          Try again
        </Button>
      </div>
    </div>
  );
}