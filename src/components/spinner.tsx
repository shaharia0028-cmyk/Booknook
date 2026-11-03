import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn("size-6 animate-spin text-accent", className)} aria-hidden="true" />;
}

/** Full-width loading state shown while a page is fetching its data. */
export function PageLoader() {
  return (
    <div role="status" className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <Spinner className="size-10" />
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  );
}
