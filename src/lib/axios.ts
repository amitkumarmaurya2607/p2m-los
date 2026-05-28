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

async function handleServer401(): Promise<never> {
  if (typeof window === "undefined") {
    const { deleteSession } = (await import("@/lib/session")) as typeof import("@/lib/session");
    const { deleteStepCookie } =
      (await import("@/lib/step-cookie")) as typeof import("@/lib/step-cookie");
    const { redirect } = (await import("next/navigation")) as typeof import("next/navigation");
    const { cookies: getCookies } = (await import("next/headers")) as typeof import("next/headers");
    await deleteSession();
    await deleteStepCookie();
    const cookieStore = await getCookies();
    cookieStore.delete("p2m-lat");
    cookieStore.delete("p2m-lng");
    redirect("/apply-now?type=exp");
  } else {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/apply-now?type=exp";
  }
  throw new Error("unreachable");
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

      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      const lat = cookieStore.get("p2m-lat")?.value;
      const lng = cookieStore.get("p2m-lng")?.value;
      if (lat) { config.headers["X-User-Location"] = lat; }
      const method = (config.method?.toUpperCase() ?? "GET") as string;
      const url = config.baseURL
        ? (config.url?.replace(config.baseURL, "") ?? config.url ?? "")
        : (config.url ?? "");

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
      const start = (response.config as unknown as Record<string, unknown>)._reqStart as
        | number
        | undefined;
      const duration = start ? Date.now() - start : 0;

      logApiResponse("outgoing", method, url, response.status, duration, response.data);

      return response;
    },
    (error: AxiosError) => {
      const method = (error.config?.method?.toUpperCase() ?? "GET") as string;
      const url = error.config?.url ?? "";
      const start = (error.config as unknown as Record<string, unknown>)?._reqStart as
        | number
        | undefined;
      const duration = start ? Date.now() - start : 0;
      const status = error.response?.status ?? 0;

      logApiResponse("outgoing", method, url, status, duration, error.response?.data, error);

      if (status === 401) {
        return Promise.reject(error);
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

async function handle401<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      await handleServer401();
    }
    throw err;
  }
}

export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return handle401(apiClient.get<T>(url, config).then((r) => r.data));
}

export async function apiPost<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return handle401(apiClient.post<T>(url, body, config).then((r) => r.data));
}

export async function apiPut<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  return handle401(apiClient.put<T>(url, body, config).then((r) => r.data));
}

export async function apiDelete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return handle401(apiClient.delete<T>(url, config).then((r) => r.data));
}

export default apiClient;
