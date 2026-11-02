"use client";

import Image from "next/image";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

type BookImageProps = {
  src?: string;
  alt: string;
  className?: string;
  /** Tells the browser which image size to download. */
  sizes?: string;
  /** Use for images at the top of the page so they load first. */
  priority?: boolean;
};

const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

function isValidUrl(value?: string): value is string {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

/** Cover image: resized and cached by Next.js, with a placeholder if it is missing or fails to load. */
export function BookImage({ src, alt, className, sizes = CARD_SIZES, priority = false }: BookImageProps) {
  const [failed, setFailed] = useState(false);
  const showImage = isValidUrl(src) && !failed;

  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <BookOpen className="size-1/3 min-h-5 min-w-5" />
        </div>
      )}
    </div>
  );
}
