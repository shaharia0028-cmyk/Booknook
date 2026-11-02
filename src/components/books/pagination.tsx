import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = { page: number; pages: number; search: string; category: string };

function pageHref(page: number, search: string, category: string) {
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category) query.set("category", category);
  if (page > 1) query.set("page", String(page));
  const text = query.toString();
  return text ? `/books?${text}` : "/books";
}

export function Pagination({ page, pages, search, category }: PaginationProps) {
  if (pages <= 1) return null;

  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const end = Math.min(pages, start + 4);
  const numbers = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Button asChild variant="outline" size="sm">
          <Link href={pageHref(page - 1, search, category)}>
            <ChevronLeft /> Previous
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          <ChevronLeft /> Previous
        </Button>
      )}

      {numbers.map((number) => (
        <Button key={number} asChild variant={number === page ? "default" : "outline"} size="sm" className="min-w-9 px-3">
          <Link href={pageHref(number, search, category)} aria-current={number === page ? "page" : undefined}>
            {number}
          </Link>
        </Button>
      ))}

      {page < pages ? (
        <Button asChild variant="outline" size="sm">
          <Link href={pageHref(page + 1, search, category)}>
            Next <ChevronRight />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" disabled>
          Next <ChevronRight />
        </Button>
      )}
    </nav>
  );
}
