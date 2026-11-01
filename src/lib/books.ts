import { db } from "./mongodb";
import type { Book } from "@/types";

/** Latest books first. Swap this for a call to your Express API if you prefer. */
export async function getLatestBooks(limit = 6): Promise<Book[]> {
  if (!process.env.MONGODB_URI) return [];

  try {
    const docs = await db
      .collection("books")
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return docs.map((doc) => ({
      _id: String(doc._id),
      title: String(doc.title ?? ""),
      author: String(doc.author ?? ""),
      category: String(doc.category ?? ""),
      image: String(doc.image ?? ""),
    }));
  } catch (error) {
    console.error("Failed to load latest books:", error);
    return [];
  }
}
