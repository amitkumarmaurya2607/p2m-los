import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";
import { getSession } from "@/lib/session";
import { logApiRequest, logApiResponse } from "@/lib/api-logger";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";

function headersToRecord(headers: unknown): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers || typeof headers !== "object") return result;
  for (const [key, value] of Object.entries(headers)) {
    result[key] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  return result;
}

function createClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  client.interceptors.request.use(
    async (config) => {
      const token = await getSession();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const method = (config.method?.toUpperCase() ?? "GET") as string;
      const url = config.baseURL ? config.url?.replace(config.baseURL, "") ?? config.url ?? "" : config.url ?? "";

      (config as unknown as Record<string, unknown>)._reqStart = Date.now();

      logApiRequest("outgoing", method, url, headersToRecord(config.headers), config.data);

      return config;
    },
    (error) => {
      logApiResponse("outgoing", "", "", 0, 0, undefined, error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      const method = (response.config.method?.toUpperCase() ?? "GET") as string;
      const url = response.config.url ?? "";
      const start = (response.config as unknown as Record<string, unknown>)._reqStart as number | undefined;
      const duration = start ? Date.now() - start : 0;

      logApiResponse("outgoing", method, url, response.status, duration, response.data);

      return response;
    },
    (error: AxiosError) => {
      const method = (error.config?.method?.toUpperCase() ?? "GET") as string;
      const url = error.config?.url ?? "";
      const start = (error.config as unknown as Record<string, unknown>)?._reqStart as number | undefined;
      const duration = start ? Date.now() - start : 0;
      const status = error.response?.status ?? 0;

      logApiResponse("outgoing", method, url, status, duration, error.response?.data, error);

      if (status === 401 && typeof window !== "undefined") {
        window.location.href = "/apply-now?type=exper";
      }

      const message =
        error.response?.data &&
        typeof error.response.data === "object" &&
        "message" in error.response.data
          ? String((error.response.data as Record<string, unknown>).message)
          : error.message || "An unexpected error occurred";
      return Promise.reject(new Error(message));
    },
  );

  return client;
}

const apiClient = createClient();

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}

export default apiClient;
