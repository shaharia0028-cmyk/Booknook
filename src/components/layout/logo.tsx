import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 36 36" className={cn("size-9", className)} aria-hidden="true">
      <rect width="36" height="36" rx="8" className={inverted ? "fill-[hsl(42_50%_96%)]" : "fill-primary"} />
      <g
        fill="none"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        className={inverted ? "stroke-[hsl(163_36%_15%)]" : "stroke-primary-foreground"}
      >
        <path d="M8 13c3-1.4 6.2-1.2 10 1v12c-3.8-2.2-7-2.4-10-1z" />
        <path d="M28 13c-3-1.4-6.2-1.2-10 1v12c3.8-2.2 7-2.4 10-1z" />
      </g>
      <path d="M23 0v11l2.5-2 2.5 2V0z" className="fill-accent" />
    </svg>
  );
}

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" aria-label="BookNook home" className="inline-flex items-center gap-2.5">
      <LogoMark inverted={inverted} />
      <span className="font-serif text-2xl font-semibold tracking-tight">BookNook</span>
    </Link>
  );
}
