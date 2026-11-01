import { SectionHeading } from "@/components/section-heading";

const steps = [
  { title: "Browse", text: "Explore the shelves and filter by category to find a book you like." },
  { title: "Borrow", text: "Open a book, check that it is available and borrow it in one click." },
  { title: "Read", text: "Enjoy the book. Everything you have on loan is listed in My Borrows." },
  { title: "Return", text: "Return the book when you finish so the next reader can enjoy it." },
];

export function HowItWorks() {
  return (
    <section className="section border-y bg-muted/40">
      <div className="container-page">
        <SectionHeading title="How Borrowing Works" description="Four simple steps from shelf to reader and back." />
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="h-full rounded-lg border bg-card p-6">
              <span className="flex size-12 items-center justify-center rounded-full border-2 border-accent font-serif text-xl font-semibold text-accent">
                {index + 1}
              </span>
              <h3 className="mt-5 font-serif text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
