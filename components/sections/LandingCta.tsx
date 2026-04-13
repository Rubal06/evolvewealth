import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export function LandingCta() {
  return (
    <section className="px-4 pb-24 pt-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <GlassCard className="overflow-hidden p-8 text-center md:p-12">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Start Now</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.08em] md:text-5xl">
            Replace cashback dopamine with compounding momentum
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
            Open your vault, activate round-ups, and turn everyday spending into the first layer of your long-term wealth engine.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/register">Create Your Account {"\u2192"}</Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
