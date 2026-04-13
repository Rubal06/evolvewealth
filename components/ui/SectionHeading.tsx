import { Badge } from "@/components/ui/Badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false
}: {
  eyebrow: string;
  title: string;
  description: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "mx-auto mb-12 max-w-3xl text-center" : "mb-12 max-w-3xl"}>
      <Badge className="mb-4">{eyebrow}</Badge>
      <h2 className="font-display text-3xl font-extrabold tracking-[-0.08em] md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[var(--text-secondary)] md:text-lg">{description}</p>
    </div>
  );
}
