import type { Book } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/** Latest books first, loaded from the Express API (sorted and limited in MongoDB). */
export async function getLatestBooks(limit = 6): Promise<Book[]> {
  if (!API_URL) return [];

  try {
    const res = await fetch(`${API_URL}/books?limit=${limit}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const data = (await res.json()) as { books: Book[] };
    return data.books;
  } catch (error) {
    console.error("Failed to load latest books:", error);
    return [];
  }
}

export type BooksPage = { books: Book[]; total: number; page: number; pages: number; failed: boolean };

/** Public list for the All Books page (20 per page), with optional search text and category. */
export async function getBooks(filters: { search?: string; category?: string; page?: number } = {}): Promise<BooksPage> {
  const empty: BooksPage = { books: [], total: 0, page: 1, pages: 1, failed: true };
  if (!API_URL) return empty;

  const query = new URLSearchParams();
  if (filters.search) query.set("search", filters.search);
  if (filters.category) query.set("category", filters.category);
  if (filters.page && filters.page > 1) query.set("page", String(filters.page));

  try {
    const res = await fetch(`${API_URL}/books?${query.toString()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`API responded with ${res.status}`);
    const data = (await res.json()) as Omit<BooksPage, "failed">;
    return { ...data, failed: false };
  } catch (error) {
    console.error("Failed to load books:", error);
    return empty;
  }
}
