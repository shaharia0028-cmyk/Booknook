import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Book } from "@/types";
import { BookImage } from "./book-image";

type BookCardProps = { book: Book; compact?: boolean; priority?: boolean };

const COMPACT_SIZES = "(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw";

export function BookCard({ book, compact = false, priority = false }: BookCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border bg-card">
      <BookImage
        src={book.image}
        alt={book.title}
        priority={priority}
        sizes={compact ? COMPACT_SIZES : undefined}
        className="aspect-[3/4] w-full"
      />
      <div className={cn("flex flex-1 flex-col", compact ? "p-4" : "p-5")}>
        <h3 className={cn("line-clamp-1 font-serif font-semibold", compact ? "text-base" : "text-xl")}>{book.title}</h3>
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">by {book.author}</p>
        <span className="mt-3 w-fit rounded-full border border-accent/50 px-3 py-0.5 text-xs font-medium text-accent">
          {book.category || "Uncategorised"}
        </span>
        <div className={cn("mt-auto", compact ? "pt-4" : "pt-5")}>
          <Button asChild size={compact ? "sm" : "default"} className="w-full">
            <Link href={`/books/${book._id}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
