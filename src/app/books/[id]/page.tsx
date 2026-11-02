import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { BookImage } from "@/components/books/book-image";
import { BorrowDialog } from "@/components/books/borrow-dialog";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { serverApiGet } from "@/lib/api-server";
import { requireUser } from "@/lib/session";
import type { Book } from "@/types";

export const metadata: Metadata = { title: "Book Details" };
export const dynamic = "force-dynamic";

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const path = `/books/${id}`;
  const user = await requireUser(path);
  const { data: book, status } = await serverApiGet<Book>(path);

  if (status === 400 || status === 404) notFound();
  if (status === 401) redirect(`/login?callbackUrl=${encodeURIComponent(path)}`);
  if (!book) {
    return (
      <section className="section">
        <div className="container-page">
          <EmptyState message="We could not load this book right now. Please try again in a moment." actionLabel="All Books" actionHref="/books" />
        </div>
      </section>
    );
  }

  const copies = book.copies ?? 0;

  return (
    <section className="section">
      <div className="container-page grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-16">
        <BookImage src={book.image} alt={book.title} priority sizes="(min-width: 768px) 40vw, 90vw" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-lg border md:max-w-none" />

        <div>
          <span className="inline-block rounded-full border border-accent/50 px-3 py-0.5 text-xs font-medium text-accent">
            {book.category}
          </span>
          <h1 className="section-title mt-4">{book.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">by {book.author}</p>
          <p className="section-text mt-6 whitespace-pre-line">{book.description}</p>

          <dl className="mt-8 grid gap-6 rounded-lg border bg-card p-6 sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-sm text-muted-foreground">Added by</dt>
              <dd className="mt-1 font-semibold">{book.ownerName || "BookNook reader"}</dd>
              {book.ownerEmail && <dd className="truncate text-sm text-muted-foreground">{book.ownerEmail}</dd>}
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Copies left</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold">{copies}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BorrowDialog bookId={book._id} title={book.title} copies={copies} userName={user.name} userEmail={user.email} />
            <Button asChild variant="ghost" size="lg">
              <Link href="/books">Back to all books</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
