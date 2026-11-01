import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { getLatestBooks } from "@/lib/books";
import { BookCard } from "./book-card";

export async function NewArrivals() {
  const books = await getLatestBooks(6);

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading title="New Arrivals" description="The latest books added by our readers." />

        {books.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-lg border border-dashed p-10 text-center">
            <p className="section-text">No books have been added yet. Be the first to share one.</p>
            <Button asChild className="mt-6">
              <Link href="/add-book">Add Book</Link>
            </Button>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/books">See All Books</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
