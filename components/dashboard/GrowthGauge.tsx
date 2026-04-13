"use client";

import { GlassCard } from "@/components/ui/GlassCard";

const percent = 0.724;
const radius = 110;
const arc = Math.PI * radius * 1.22;
const offset = arc * (1 - percent);

export function GrowthGauge() {
  return (
    <GlassCard className="h-full p-6">
      <p className="mb-5 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Financial Growth Score</p>
      <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center">
        <svg viewBox="0 0 280 180" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1B6FFF" />
              <stop offset="100%" stopColor="#00F5A0" />
            </linearGradient>
          </defs>
          <path d="M 30 150 A 110 110 0 0 1 250 150" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="16" strokeLinecap="round" />
          <path
            d="M 30 150 A 110 110 0 0 1 250 150"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            style={{ strokeDasharray: arc, strokeDashoffset: offset, transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)" }}
          />
        </svg>
        <div className="relative text-center">
          <div className="font-display text-5xl font-extrabold tracking-[-0.08em]">724</div>
          <div className="mt-2 inline-flex rounded-full border border-[rgba(255,255,255,0.08)] bg-[var(--mint-dim)] px-3 py-1 text-sm text-[var(--mint)]">
            Wealth Builder
          </div>
          <p className="mt-4 text-sm text-[var(--text-secondary)]">Top 14% of EvolveWealth users</p>
        </div>
      </div>
      <div className="mt-2 flex gap-2">
        {[1, 2, 3, 4, 5, 6].map((segment) => (
          <span
            key={segment}
            className="h-2 flex-1 rounded-full"
            style={{
              background:
                segment <= 3 ? "var(--mint)" : segment === 4 ? "rgba(27, 111, 255, 0.45)" : "rgba(255,255,255,0.08)"
            }}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--text-secondary)]">+300 XP earned this week</p>
    </GlassCard>
  );
}
