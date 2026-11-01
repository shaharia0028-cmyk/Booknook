import Link from "next/link";
import { Button } from "@/components/ui/button";

type EmptyStateProps = { message: string; actionLabel?: string; actionHref?: string };

export function EmptyState({ message, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-dashed p-10 text-center">
      <p className="section-text">{message}</p>
      {actionLabel && actionHref && (
        <Button asChild className="mt-6">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}
