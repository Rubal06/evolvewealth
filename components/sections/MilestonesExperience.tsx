"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { MilestoneRoad } from "@/components/dashboard/MilestoneRoad";
import { demoMilestones, demoSummary } from "@/lib/demo-data";

const completedCount = demoMilestones.filter((milestone) => milestone.status !== "LOCKED").length;
const progressPercentage = (completedCount / demoMilestones.length) * 100;

export function MilestonesExperience() {
  return (
    <div className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-[36px] border border-[var(--glass-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-12 md:px-10">
          <p className="text-sm uppercase tracking-[0.28em] text-[var(--mint)]">Milestones</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-[-0.08em] text-white md:text-6xl">
            Road to Freedom
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
            Track every level on the path from your first invested rupee to full empire mode.
            Progress is visible, rewards feel earned, and the next target is always in sight.
          </p>
        </section>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  Progress
                </p>
                <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.05em] text-white">
                  {completedCount}/5 complete
                </h2>
              </div>
              <div className="rounded-[24px] border border-[rgba(61,251,191,0.18)] bg-[rgba(61,251,191,0.08)] px-5 py-3 text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">XP Total</p>
                <p className="mt-1 font-display text-3xl font-extrabold tracking-[-0.04em] text-[var(--mint)]">
                  {demoSummary.xp}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                <span>Milestone Completion</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-[var(--obsidian-3)]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--mint),var(--cobalt))]"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </GlassCard>

          <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.22em] text-[var(--mint)]">Status</p>
            <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.05em] text-white">
              Wealth Builder unlocked
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-secondary)]">
              You&apos;ve already cleared the first three checkpoints. The next push is Freedom
              Fighter — one strong compounding stretch away.
            </p>
          </GlassCard>
        </div>

        <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
          <MilestoneRoad />
        </GlassCard>
      </div>
    </div>
  );
}
