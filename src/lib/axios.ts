import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";
import { redirect } from "next/navigation";
import { getMock } from "@/lib/mock/data";
import { getSession } from "@/lib/session";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api";
const USE_MOCK = process.env.MOCK_API === "true" || !process.env.API_BASE_URL;

function createClient(): AxiosInstance {
  const client = axios.create({
    baseURL: BASE_URL,
    timeout: 30_000,
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

  client.interceptors.request.use(
    async (config) => {
      if (!USE_MOCK && typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
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
        redirect("/apply?type=exper");
      }

      const message =
        error.response?.data && typeof error.response.data === "object" && "message" in error.response.data
          ? String((error.response.data as Record<string, unknown>).message)
          : error.message || "An unexpected error occurred";
      return Promise.reject(new Error(message));
    },
  );

  return client;
}

const apiClient = createClient();

async function requestWithMock<T>(method: string, url: string, body?: unknown): Promise<T> {
  if (USE_MOCK) {
    const mock = getMock(method, url);
    if (mock) {
      console.log(`[MOCK] ${method} ${url}`);
      await new Promise((r) => setTimeout(r, 600));
      return mock as T;
    }
  }
  const { data } = body !== undefined
    ? await apiClient.request<T>({ method, url, data: body })
    : await apiClient.request<T>({ method, url });
  return data;
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  if (USE_MOCK) return requestWithMock<T>("GET", url);
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  if (USE_MOCK) return requestWithMock<T>("POST", url, body);
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

export async function apiPut<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  if (USE_MOCK) return requestWithMock<T>("PUT", url, body);
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  if (USE_MOCK) return requestWithMock<T>("DELETE", url);
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}

export default apiClient;
