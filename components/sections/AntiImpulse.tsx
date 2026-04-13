"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { MilestoneRoad } from "@/components/dashboard/MilestoneRoad";

export function AntiImpulse() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="shield" aria-label="Anti Impulse Shield" className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-[radial-gradient(circle_at_left,rgba(27,111,255,0.18),transparent_70%)] blur-3xl" />
          <SectionHeading
            eyebrow="ANTI-IMPULSE SHIELD"
            title="Your money's bodyguard. Triggered before you spend, not after."
            description="AI nudges intercept the habit loops before another cashback hit steals your future."
          />
          <div className="mx-auto mt-10 max-w-sm rounded-[36px] border border-[rgba(255,255,255,0.12)] bg-[var(--obsidian-2)] p-4 shadow-card">
            <div className="mx-auto mb-4 h-2 w-24 rounded-full bg-[rgba(255,255,255,0.08)]" />
            <div className="mb-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>9:41 AM</span>
              <span>{"\u25B0\u25B0\u25B0"} 92%</span>
            </div>
            <motion.div
              initial={prefersReducedMotion ? false : { y: 40, opacity: 0 }}
              whileInView={prefersReducedMotion ? {} : { y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-3)] p-4"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--cobalt)] font-display font-bold">EW</span>
                <div>
                  <div className="font-medium">EvolveWealth</div>
                  <div className="text-xs text-[var(--text-secondary)]">now</div>
                </div>
              </div>
              <p className="text-sm leading-7 text-[var(--text-primary)]">
                You&apos;re about to spend {"\u20B9"}500 on Zomato. If you invest this instead, it grows to {"\u20B9"}1,200 by 2029. Invest now?
              </p>
              <div className="mt-4 flex gap-3">
                <button aria-label="Invest now" className="rounded-full bg-[var(--cobalt)] px-4 py-2 text-sm text-white">
                  {"\u{1F4B0}"} Invest Now
                </button>
                <button aria-label="Spend anyway" className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2 text-sm text-[var(--text-secondary)]">
                  Spend anyway
                </button>
              </div>
              <GlassCard className="mt-4 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Why this nudge?</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                  You&apos;ve ordered Zomato 4{"\u00D7"} this week. Food budget: 180% over target. This skip funds 2 days of micro-investing.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="ROAD TO FREEDOM"
            title="Gamified wealth milestones"
            description="Progress feels visible, status feels earned, and the next milestone always gives you a reason to keep compounding."
          />
          <MilestoneRoad />
        </div>
      </div>
    </section>
  );
}
