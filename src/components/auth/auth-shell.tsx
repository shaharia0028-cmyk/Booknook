type AuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthShell({ title, description, children, footer }: AuthShellProps) {
  return (
    <section className="bg-muted/40 py-12 md:py-20">
      <div className="container-page">
        <div className="mx-auto w-full max-w-md rounded-md border bg-card p-6 shadow-xl shadow-primary/10 sm:p-8">
          <h1 className="section-title border-b-2 border-accent pb-3">{title}</h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">{description}</p>
          <div className="mt-6">{children}</div>
          {footer && <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>}
        </div>
      </div>
    </section>
  );
}
