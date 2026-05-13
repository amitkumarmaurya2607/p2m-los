import type { LogEntry, LogLevel } from "@/types";

const SENSITIVE_KEYS = new Set([
  "pan",
  "aadhaar",
  "aadhar",
  "mobile",
  "phone",
  "accountNumber",
  "bankAccount",
  "password",
  "otp",
  "token",
  "secret",
  "pin",
  "cvv",
]);

const PAN_PATTERN = /[A-Z]{5}[0-9]{4}[A-Z]/g;
const AADHAAR_PATTERN = /\d{4}\s?\d{4}\s?\d{4}/g;
const MOBILE_PATTERN = /(\+91)?[6-9]\d{9}/g;
const EMAIL_PATTERN = /[^\s@]+@[^\s@]+\.[^\s@]+/g;

function maskSensitiveText(text: string): string {
  return text
    .replace(PAN_PATTERN, (m) => m.slice(0, 2) + "******" + m.slice(-1))
    .replace(AADHAAR_PATTERN, "**** **** ****")
    .replace(MOBILE_PATTERN, (m) => (m.length > 10 ? m.slice(0, 3) : "") + "******" + m.slice(-4))
    .replace(EMAIL_PATTERN, (m) => m[0] + "****" + m.slice(m.indexOf("@")));
}

function sanitizeContext(context: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(context)) {
    if (SENSITIVE_KEYS.has(key)) {
      result[key] = "***";
    } else if (typeof value === "string") {
      result[key] = maskSensitiveText(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

function makeEntry(
  level: LogLevel,
  message: string,
  context?: Record<string, unknown>,
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message: maskSensitiveText(message),
    source: typeof window === "undefined" ? "server" : "client",
    context: context ? sanitizeContext(context) : undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  };
}

function logToFile(entry: LogEntry): void {
  if (typeof window !== "undefined") return;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { existsSync, mkdirSync, appendFileSync } = require("fs") as typeof import("fs");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { join } = require("path") as typeof import("path");

  const logsDir = join(process.cwd(), "logs");
  const date = new Date().toISOString().slice(0, 10);
  const filePath = join(logsDir, `${date}.log`);

  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }

  appendFileSync(filePath, JSON.stringify(entry) + "\n", "utf-8");
}

async function logToApi(entry: LogEntry): Promise<void> {
  try {
    const useBeacon =
      entry.level === "error" &&
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function";

    if (useBeacon) {
      navigator.sendBeacon("/api/log", JSON.stringify(entry));
    } else {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      }).catch(() => {});
    }
  } catch {
    // silent fail to avoid infinite error loops
  }
}

function log(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const entry = makeEntry(level, message, context);

  if (typeof window === "undefined") {
    logToFile(entry);
    const prefix = `[${entry.timestamp}] [${level.toUpperCase()}]`;
    if (level === "error") {
      console.error(prefix, entry.message, entry.context ?? "");
    } else if (level === "warn") {
      console.warn(prefix, entry.message, entry.context ?? "");
    } else {
      console.log(prefix, entry.message, entry.context ?? "");
    }
  } else {
    logToApi(entry);
  }
}

export function logError(message: string, context?: Record<string, unknown>): void {
  log("error", message, context);
}

export function logWarn(message: string, context?: Record<string, unknown>): void {
  log("warn", message, context);
}

export function logInfo(message: string, context?: Record<string, unknown>): void {
  log("info", message, context);
}

export function logServerError(error: unknown, context?: Record<string, unknown>): void {
  const message = error instanceof Error ? error.message : String(error);
  logError(message, {
    ...context,
    stack: error instanceof Error ? error.stack : undefined,
  });
}
