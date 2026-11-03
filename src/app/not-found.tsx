import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-lg border border-dashed p-10 text-center">
          <p className="font-serif text-6xl font-semibold text-accent">404</p>
          <h1 className="section-title mt-4">Page not found</h1>
          <p className="section-text mt-3">We could not find the page you were looking for.</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
