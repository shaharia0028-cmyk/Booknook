type SectionHeadingProps = {
  title: string;
  description?: string;
};

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-text mt-4">{description}</p>}
    </div>
  );
}
