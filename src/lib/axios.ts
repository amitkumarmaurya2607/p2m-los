import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";
import { getSession } from "@/lib/session";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";

function createClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  client.interceptors.request.use(
    async (config) => {
      if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
        console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
      }

      const token = await getSession();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
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
