import type { Metadata } from "next";
import Link from "next/link";
import { DeleteBookButton, EditBookDialog } from "@/components/books/book-actions";
import { BookImage } from "@/components/books/book-image";
import { DataTable, tdClass, thClass } from "@/components/books/data-table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { serverApiGet } from "@/lib/api-server";
import { requireUser } from "@/lib/session";
import type { Book } from "@/types";

export const metadata: Metadata = { title: "My Books" };
export const dynamic = "force-dynamic";

export default async function MyBooksPage() {
  const user = await requireUser("/my-books");
  const { data } = await serverApiGet<{ books: Book[] }>(`/books?email=${encodeURIComponent(user.email)}&limit=100`);
  const books = data?.books ?? null;

  return (
    <>
      <PageHeader title="My Books" description="Books you added to the library." />
      <section className="section">
        <div className="container-page">
          {!books ? (
            <EmptyState message="We could not load your books right now. Please try again in a moment." />
          ) : books.length === 0 ? (
            <EmptyState message="You have not added any books yet." actionLabel="Add Book" actionHref="/add-book" />
          ) : (
            <DataTable>
              <thead className="bg-muted/50">
                <tr>
                  <th className={thClass}>Book</th>
                  <th className={thClass}>Category</th>
                  <th className={thClass}>Copies</th>
                  <th className={`${thClass} text-right`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td className={tdClass}>
                      <div className="flex items-center gap-4">
                        <BookImage src={book.image} alt={book.title} sizes="48px" className="h-16 w-12 shrink-0 rounded-sm" />
                        <div className="min-w-0">
                          <Link href={`/books/${book._id}`} className="line-clamp-1 font-semibold hover:text-accent">
                            {book.title}
                          </Link>
                          <p className="line-clamp-1 text-muted-foreground">{book.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <span className="rounded-full border border-accent/50 px-3 py-0.5 text-xs font-medium text-accent">{book.category}</span>
                    </td>
                    <td className={tdClass}>{book.copies ?? 0}</td>
                    <td className={tdClass}>
                      <div className="flex justify-end gap-2">
                        <EditBookDialog book={book} />
                        <DeleteBookButton book={book} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          )}
        </div>
      </section>
    </>
  );
}
