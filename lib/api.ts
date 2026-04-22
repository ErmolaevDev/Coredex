const rawBase =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL
    ? process.env.NEXT_PUBLIC_API_URL
    : "/api"

/** Base URL for API calls (e.g. `/api` when using Next.js rewrites). */
export const apiBaseUrl = rawBase.replace(/\/$/, "")

/** JWT storage key (must match login/register persistence). */
export const TOKEN_KEY = "token"

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(TOKEN_KEY)
}

export function setAccessToken(token: string | null): void {
  if (typeof window === "undefined") return
  if (token) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    localStorage.removeItem(TOKEN_KEY)
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type ErrorEnvelope = { error?: { code?: string; message?: string } }

function joinUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`
  return `${apiBaseUrl}${p}`
}

async function parseJson<T>(res: Response): Promise<T> {
  const text = await res.text()
  if (!text) return {} as T
  try {
    return JSON.parse(text) as T
  } catch {
    console.error("Invalid JSON response", {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      body: text.slice(0, 500), // Log first 500 chars for debugging
    })
    console.error("Invalid JSON response", {
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      body: text.slice(0, 500), // Log first 500 chars for debugging
    })
    throw new ApiError("Invalid JSON response", res.status, text)
  }
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers)
  const token =
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }
  if (
    init.body !== undefined &&
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json")
  }

  const res = await fetch(joinUrl(path), {
    ...init,
    headers,
    credentials: "include",
  })

  const data = await parseJson<T & ErrorEnvelope>(res)

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && "error" in data && data.error
        ? String((data as ErrorEnvelope).error?.message ?? res.statusText)
        : res.statusText
    throw new ApiError(msg || "Request failed", res.status, data)
  }

  return data as T
}

export type Subscription = {
  id: number
  user_id: number
  family_id?: number | null
  name: string
  price: number
  billing_cycle: string
  next_billing_date: string
  status: string
}

export type SubscriptionsResponse = {
  subscriptions: Subscription[]
}

export type AnalyticsSummary = {
  monthly_spend: number
  yearly_spend: number
  active_subscriptions: number
}

export type Notification = {
  id: number
  user_id: number
  title: string
  body: string
  read: boolean
  created_at: string
}

export type NotificationsResponse = {
  notifications: Notification[]
}

export type CreateSubscriptionInput = {
  name: string
  price: number
  billing_cycle: "monthly" | "yearly"
  next_billing_date: string
  status?: "active" | "inactive"
  share_with_family?: boolean
}

export async function getSubscriptions(): Promise<Subscription[]> {
  const data = await apiFetch<SubscriptionsResponse>("/subscriptions", {
    method: "GET",
  })
  return data.subscriptions ?? []
}

export async function createSubscription(
  input: CreateSubscriptionInput
): Promise<Subscription> {
  const data = await apiFetch<{ subscription: Subscription }>("/subscriptions", {
    method: "POST",
    body: JSON.stringify(input),
  })
  return data.subscription
}

export async function getAnalytics(): Promise<AnalyticsSummary> {
  return apiFetch<AnalyticsSummary>("/analytics/summary", { method: "GET" })
}

export async function getNotifications(): Promise<Notification[]> {
  const data = await apiFetch<NotificationsResponse>("/notifications", {
    method: "GET",
  })
  return data.notifications ?? []
}

export async function register(
  username: string,
  email: string,
  password: string,
  promoCode?: string
): Promise<{ token: string }> {
  const data = await apiFetch<{ token: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password, promo_code: promoCode }),
  })
  return { token: data.token }
}

export async function login(
  email: string,
  password: string
): Promise<{ token: string }> {
  const data = await apiFetch<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })
  return { token: data.token }
}
