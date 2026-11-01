import type { Metadata } from "next";
import { BookForm } from "@/components/books/book-form";
import { PageHeader } from "@/components/page-header";
import { requireUser } from "@/lib/session";

export const metadata: Metadata = { title: "Add Book" };

export default async function AddBookPage() {
  const user = await requireUser("/add-book");

  return (
    <>
      <PageHeader title="Add a Book" description="Put a book from your shelf into the library." />
      <section className="section">
        <div className="container-page">
          <div className="mx-auto max-w-2xl rounded-lg border bg-card p-6 sm:p-8">
            <BookForm mode="add" user={{ name: user.name, email: user.email }} />
          </div>
        </div>
      </section>
    </>
  );
}
