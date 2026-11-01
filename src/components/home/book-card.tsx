/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      <div className="relative aspect-[3/4] w-full bg-muted">
        {book.image ? (
          <img src={book.image} alt={book.title} loading="lazy" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <BookOpen className="size-10" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-1 font-serif text-xl font-semibold">{book.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">by {book.author}</p>
        <span className="mt-3 w-fit rounded-full border border-accent/50 px-3 py-0.5 text-xs font-medium text-accent">
          {book.category || "Uncategorised"}
        </span>
        <Button asChild className="mt-auto w-full">
          <Link href={`/books/${book._id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  );
}
