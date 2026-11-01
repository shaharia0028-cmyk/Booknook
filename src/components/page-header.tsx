export function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="border-b bg-muted/40 py-12 text-center">
      <div className="container-page">
        <h1 className="section-title">{title}</h1>
        <p className="section-text mx-auto mt-3 max-w-xl">{description}</p>
      </div>
    </div>
  );
}
