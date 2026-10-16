import { supabase } from "./supabase"

/**
 * REST API client for the Express backend.
 * Attaches the current Supabase access token so the backend can verify
 * the caller and check the role server-side.
 */
const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/+$/, "")

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

async function getAccessToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token ?? null
  } catch {
    return null
  }
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  body?: unknown
  /** Set false for public endpoints (no Authorization header is sent) */
  auth?: boolean
}

export async function apiFetch<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true } = options

  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (auth) {
    const token = await getAccessToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError("Cannot reach the server. Is the backend running?", 0)
  }

  let json: unknown = null
  try {
    json = await res.json()
  } catch {
    // Non-JSON response body
  }

  if (!res.ok) {
    const payload = json as { error?: string; message?: string; details?: unknown } | null
    const message = payload?.message || payload?.error || `Request failed (${res.status})`
    throw new ApiError(message, res.status, payload?.details)
  }

  return json as T
}

export const api = {
  get: <T = unknown>(path: string, options: RequestOptions = {}) =>
    apiFetch<T>(path, { method: "GET", ...options }),
  post: <T = unknown>(path: string, body?: unknown, options: RequestOptions = {}) =>
    apiFetch<T>(path, { method: "POST", body, ...options }),
  put: <T = unknown>(path: string, body?: unknown, options: RequestOptions = {}) =>
    apiFetch<T>(path, { method: "PUT", body, ...options }),
  patch: <T = unknown>(path: string, body?: unknown, options: RequestOptions = {}) =>
    apiFetch<T>(path, { method: "PATCH", body, ...options }),
  delete: <T = unknown>(path: string, options: RequestOptions = {}) =>
    apiFetch<T>(path, { method: "DELETE", ...options }),
}
