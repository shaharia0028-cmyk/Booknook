import { headers } from "next/headers";
import { auth } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ServerResult<T> = { data: T | null; status: number };

/** Calls the Express API from a server component with the signed-in user's JWT. */
export async function serverApiGet<T>(path: string): Promise<ServerResult<T>> {
  if (!API_URL) return { data: null, status: 500 };

  try {
    const tokenResult = await auth.api.getToken({ headers: await headers() });
    if (!tokenResult?.token) return { data: null, status: 401 };

    const response = await fetch(`${API_URL}${path}`, {
      headers: { Authorization: `Bearer ${tokenResult.token}` },
      cache: "no-store",
    });
    const data = response.ok ? ((await response.json()) as T) : null;
    return { data, status: response.status };
  } catch (error) {
    console.error(`Request to ${path} failed:`, error);
    return { data: null, status: 500 };
  }
}
