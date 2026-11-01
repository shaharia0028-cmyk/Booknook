import type { Metadata } from "next";
import Link from "next/link";
import { BookCard } from "@/components/books/book-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { getBooks } from "@/lib/books";
import { bookCategories } from "@/lib/site";

export const metadata: Metadata = { title: "All Books" };
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ search?: string; category?: string }>;

export default async function AllBooksPage({ searchParams }: { searchParams: SearchParams }) {
  const { search = "", category = "" } = await searchParams;
  const { books, failed } = await getBooks({ search: search.trim(), category });
  const isFiltered = Boolean(search || category);

  return (
    <>
      <PageHeader title="All Books" description="Browse every book on the shelves and borrow your next read." />
      <section className="section">
        <div className="container-page">
          <form action="/books" className="mx-auto mb-12 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <Input name="search" defaultValue={search} placeholder="Search by title or author" aria-label="Search books" />
            <Select name="category" defaultValue={category} aria-label="Category" className="sm:w-52">
              <option value="">All categories</option>
              {bookCategories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
            <Button type="submit" className="h-11">
              Search
            </Button>
          </form>

          {failed ? (
            <EmptyState message="We could not load the books right now. Please try again in a moment." />
          ) : books.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <EmptyState
              message={isFiltered ? "No books match your search." : "No books have been added yet."}
              actionLabel={isFiltered ? "Clear search" : "Add Book"}
              actionHref={isFiltered ? "/books" : "/add-book"}
            />
          )}
          {isFiltered && books.length > 0 && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              <Link href="/books" className="underline underline-offset-4 hover:text-accent">
                Clear search
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
