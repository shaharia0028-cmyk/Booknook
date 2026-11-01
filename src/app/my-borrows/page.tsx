import type { Metadata } from "next";
import Link from "next/link";
import { BookImage } from "@/components/books/book-image";
import { DataTable, tdClass, thClass } from "@/components/books/data-table";
import { ReturnButton } from "@/components/books/return-button";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { serverApiGet } from "@/lib/api-server";
import { formatDate } from "@/lib/format";
import { requireUser } from "@/lib/session";
import type { Borrow } from "@/types";

export const metadata: Metadata = { title: "My Borrows" };
export const dynamic = "force-dynamic";

export default async function MyBorrowsPage() {
  await requireUser("/my-borrows");
  const { data: borrows } = await serverApiGet<Borrow[]>("/borrows/mine");

  return (
    <>
      <PageHeader title="My Borrows" description="Books you are reading right now." />
      <section className="section">
        <div className="container-page">
          {!borrows ? (
            <EmptyState message="We could not load your borrowed books right now. Please try again in a moment." />
          ) : borrows.length === 0 ? (
            <EmptyState message="You have not borrowed any books yet." actionLabel="Browse Books" actionHref="/books" />
          ) : (
            <DataTable>
              <thead className="bg-muted/50">
                <tr>
                  <th className={thClass}>Image</th>
                  <th className={thClass}>Title</th>
                  <th className={thClass}>Borrow Date</th>
                  <th className={thClass}>Return Date</th>
                  <th className={`${thClass} text-right`}>Action</th>
                </tr>
              </thead>
              <tbody>
                {borrows.map((borrow) => (
                  <tr key={borrow._id}>
                    <td className={tdClass}>
                      <BookImage src={borrow.bookImage} alt={borrow.bookTitle} className="h-16 w-12 rounded-sm" />
                    </td>
                    <td className={`${tdClass} font-semibold`}>
                      <Link href={`/books/${borrow.bookId}`} className="hover:text-accent">
                        {borrow.bookTitle}
                      </Link>
                    </td>
                    <td className={tdClass}>{formatDate(borrow.borrowDate)}</td>
                    <td className={tdClass}>{formatDate(borrow.returnDate)}</td>
                    <td className={tdClass}>
                      <div className="flex justify-end">
                        <ReturnButton borrowId={borrow._id} />
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
