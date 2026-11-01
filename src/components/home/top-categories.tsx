import Link from "next/link";
import { BookOpen, Cpu, FlaskConical, Landmark, Newspaper, Smile } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const categories = [
  { name: "Fiction", Icon: BookOpen },
  { name: "Non-Fiction", Icon: Newspaper },
  { name: "Science", Icon: FlaskConical },
  { name: "History", Icon: Landmark },
  { name: "Technology", Icon: Cpu },
  { name: "Children", Icon: Smile },
];

export function TopCategories() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading title="Top Categories" description="Pick a shelf and start reading." />
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ name, Icon }) => (
            <li key={name}>
              <Link
                href={`/books?category=${encodeURIComponent(name)}`}
                className="flex h-full flex-col items-center gap-4 rounded-lg border bg-card p-6 text-center transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span className="flex size-14 items-center justify-center rounded-full bg-muted text-primary">
                  <Icon className="size-6" />
                </span>
                <span className="font-medium">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
