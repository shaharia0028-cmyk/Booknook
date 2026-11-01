type CatalogCardProps = {
  callNo: string;
  title: string;
  rows: string[];
};

/** A catalog index card used as the hero illustration. */
export function CatalogCard({ callNo, title, rows }: CatalogCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-md -rotate-2 rounded-md border bg-card p-6 pb-16 shadow-xl shadow-primary/10">
      <div className="flex items-baseline justify-between border-b-2 border-accent pb-3">
        <h3 className="font-serif text-2xl font-semibold">{title}</h3>
        <span className="text-sm text-muted-foreground">{callNo}</span>
      </div>
      <ul className="mt-2">
        {rows.map((row) => (
          <li key={row} className="flex h-10 items-center border-b text-sm text-card-foreground">
            {row}
          </li>
        ))}
        <li className="h-10 border-b" aria-hidden="true" />
      </ul>
      <span
        className="absolute bottom-5 left-1/2 size-4 -translate-x-1/2 rounded-full border bg-background"
        aria-hidden="true"
      />
    </div>
  );
}
