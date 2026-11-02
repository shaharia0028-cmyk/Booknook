import { EmptyState } from "@/components/empty-state";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <EmptyState message="We could not find the page you were looking for." actionLabel="Browse Books" actionHref="/books" />
      </div>
    </section>
  );
}
