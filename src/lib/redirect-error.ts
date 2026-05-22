export function isRedirectError(err: unknown): err is Error & { digest: string } {
  return (
    err instanceof Error &&
    "digest" in err &&
    typeof (err as Error & { digest: string }).digest === "string" &&
    (err as Error & { digest: string }).digest.startsWith("NEXT_REDIRECT")
  );
}

export function rethrowIfRedirect(err: unknown): void {
  if (isRedirectError(err)) throw err;
}

export function getErrorMessage(err: unknown, fallback = "Something went wrong"): string {
  return err instanceof Error ? err.message : fallback;
}
