import { cn } from "@/lib/utils";

/** Shared table shell: scrolls sideways on small screens instead of squashing. */
export function DataTable({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className={cn("w-full min-w-[640px] text-left text-sm", className)}>{children}</table>
    </div>
  );
}

export const thClass = "px-4 py-3 font-semibold text-muted-foreground";
export const tdClass = "border-t px-4 py-3 align-middle";
