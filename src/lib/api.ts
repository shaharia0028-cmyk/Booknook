import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

/** Calls the Express API from the browser with the Better Auth JWT. */
export async function apiRequest<T = unknown>(
  path: string,
  options: { method?: "GET" | "POST" | "PATCH" | "DELETE"; body?: unknown } = {},
): Promise<T> {
  if (!API_URL) throw new ApiError("The server address is not set (NEXT_PUBLIC_API_URL).", 500);

  const { data } = await authClient.token();
  if (!data?.token) throw new ApiError("Please log in again.", 401);

  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: options.method ?? "GET",
      headers: {
        Authorization: `Bearer ${data.token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError("Could not reach the server. Please try again.", 0);
  }

  const json = await response.json().catch(() => null);
  if (!response.ok) throw new ApiError(json?.message ?? "Something went wrong.", response.status);
  return json as T;
}
