import { logInfo, logWarn, logError } from "@/lib/logger";
import type { NextRequest } from "next/server";

const SENSITIVE_HEADERS = new Set([
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "token",
  "secret",
  "x-csrf-token",
]);

const MAX_BODY_LENGTH = 3000;

interface ApiLogEntry {
  timestamp: string;
  type: "request" | "response";
  direction: "incoming" | "outgoing";
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  headers: Record<string, string>;
  body?: unknown;
  error?: string;
}

let _logsDir: string | null = null;

function getLogsDir(): string {
  if (_logsDir) return _logsDir;
  const { join } = require("path") as typeof import("path");
  _logsDir = join(process.cwd(), "logs", "api");
  return _logsDir;
}

function writeApiLog(entry: ApiLogEntry): void {
  if (typeof window !== "undefined") return;
  if (process.env.LOG_ENABLED === "false" || process.env.LOG_ENABLED === "0") return;
  try {
    const { existsSync, mkdirSync, appendFileSync } = require("fs") as typeof import("fs");
    const { join } = require("path") as typeof import("path");

    const dir = getLogsDir();
    const date = new Date().toISOString().slice(0, 10);
    const filePath = join(dir, `${date}.log`);

    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    appendFileSync(filePath, JSON.stringify(entry) + "\n", "utf-8");
  } catch {
    // silent fail — logging should never break the app
  }
}

function sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    result[key] = SENSITIVE_HEADERS.has(key.toLowerCase()) ? "***" : value;
  }
  return result;
}

function headersToRecord(headers: Headers | Record<string, string>): Record<string, string> {
  if (headers instanceof Headers) {
    const result: Record<string, string> = {};
    headers.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }
  for (const [key, value] of Object.entries(headers)) {
    if (typeof value !== "string") {
      headers[key] = String(value);
    }
  }
  return { ...headers };
}

function formatBody(body: unknown): unknown {
  if (body === undefined || body === null) return undefined;
  try {
    const str = typeof body === "string" ? body : JSON.stringify(body);
    if (str.length > MAX_BODY_LENGTH) {
      return str.slice(0, MAX_BODY_LENGTH) + "... [truncated]";
    }
    try {
      return JSON.parse(str);
    } catch {
      return str;
    }
  } catch {
    return String(body);
  }
}

export function logApiRequest(
  direction: "incoming" | "outgoing",
  method: string,
  url: string,
  headers: Headers | Record<string, string>,
  body?: unknown,
): void {
  const hdrs = sanitizeHeaders(headersToRecord(headers));
  const bdy = formatBody(body);

  logInfo(`[API REQ ${direction.toUpperCase()}] ${method} ${url}`, {
    direction,
    method,
    url,
    headers: hdrs,
    body: bdy,
  });

  writeApiLog({
    timestamp: new Date().toISOString(),
    type: "request",
    direction,
    method,
    url,
    headers: hdrs,
    body: bdy,
  });
}

export function logApiResponse(
  direction: "incoming" | "outgoing",
  method: string,
  url: string,
  status: number,
  durationMs: number,
  responseBody?: unknown,
  error?: unknown,
): void {
  const bdy = formatBody(responseBody);
  const context: Record<string, unknown> = {
    direction,
    method,
    url,
    status,
    duration: durationMs,
    response: bdy,
  };

  if (error) {
    context.error = error instanceof Error ? error.message : String(error);
  }

  const message = `[API RES ${direction.toUpperCase()}] ${method} ${url} -> ${status} (${durationMs}ms)`;

  if (status >= 500) {
    logError(message, context);
  } else if (status >= 400) {
    logWarn(message, context);
  } else {
    logInfo(message, context);
  }

  writeApiLog({
    timestamp: new Date().toISOString(),
    type: "response",
    direction,
    method,
    url,
    status,
    durationMs,
    headers: {},
    body: bdy,
    error: error ? (error instanceof Error ? error.message : String(error)) : undefined,
  });
}

type NextRouteHandler = (...args: any[]) => Promise<Response> | Response;

export function withApiLogging<T extends NextRouteHandler>(handler: T): T {
  const wrapped = async (...handlerArgs: any[]): Promise<Response> => {
    const request = handlerArgs[0] as NextRequest;
    const method = request.method;
    const url = request.nextUrl.pathname + request.nextUrl.search;
    const start = Date.now();

    let reqBody: unknown | undefined;
    if (["POST", "PUT", "PATCH"].includes(method)) {
      try {
        const cloned = request.clone();
        reqBody = await cloned.json();
      } catch {
        // body not JSON or already consumed
      }
    }

    logApiRequest("incoming", method, url, request.headers, reqBody);

    try {
      const response = await handler(...handlerArgs);
      const duration = Date.now() - start;

      let resBody: unknown | undefined;
      try {
        const cloned = response.clone();
        resBody = await cloned.json();
      } catch {
        // response not JSON
      }

      logApiResponse("incoming", method, url, response.status, duration, resBody);

      response.headers.set("X-Response-Time", `${duration}ms`);
      return response;
    } catch (err) {
      const duration = Date.now() - start;
      logApiResponse("incoming", method, url, 500, duration, undefined, err);
      throw err;
    }
  };

  return wrapped as unknown as T;
}
