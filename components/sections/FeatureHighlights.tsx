import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    title: "Auto Micro-Invest",
    description:
      "Every time you spend on Zomato or Swiggy, we round up and invest the spare change into Digital Gold or ETFs automatically. No action needed."
  },
  {
    title: "Anti-Impulse Shield",
    description:
      "Before you make an impulse purchase, we show you exactly how much that money grows if invested instead. Real numbers. Real future."
  },
  {
    title: "Financial Growth Score",
    description:
      "Track your wealth journey from Seed to Empire with a live score, streak counter, and gamified milestones that make saving addictive."
  }
];

export function FeatureHighlights() {
  return (
    <section className="px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {features.map((feature, index) => (
          <GlassCard key={feature.title} className="p-6">
            <div className="mb-4 inline-flex rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              0{index + 1}
            </div>
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.08em]">{feature.title}</h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
