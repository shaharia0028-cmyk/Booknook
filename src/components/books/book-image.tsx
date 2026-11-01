/* eslint-disable @next/next/no-img-element */
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type BookImageProps = { src?: string; alt: string; className?: string };

/** Cover image with a placeholder when the book has no picture. */
export function BookImage({ src, alt, className }: BookImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="size-full object-cover" />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <BookOpen className="size-1/3 min-h-5 min-w-5" />
        </div>
      )}
    </div>
  );
}
