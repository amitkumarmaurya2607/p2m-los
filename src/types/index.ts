export type Theme = "light" | "dark";

export interface User {
  id: string;
  name: string;
  email: string;
}

export type LogLevel = "error" | "warn" | "info";

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source: "client" | "server";
  stack?: string;
  context?: Record<string, unknown>;
  url?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
