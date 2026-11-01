import type { Book } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Latest books first, loaded from the Express API (sorted and limited in MongoDB). */
export async function getLatestBooks(limit = 6): Promise<Book[]> {
  if (!API_URL) return [];

  try {
    const res = await fetch(`${API_URL}/books/latest?limit=${limit}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    return (await res.json()) as Book[];
  } catch (error) {
    console.error("Failed to load latest books:", error);
    return [];
  }
}
