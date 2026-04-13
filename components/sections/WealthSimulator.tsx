"use client";

import type { Dispatch, SetStateAction } from "react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { NumberCounter } from "@/components/ui/NumberCounter";
import { Button } from "@/components/ui/Button";
import { calculateSipProjection } from "@/lib/simulator";
import { formatInr } from "@/lib/utils";

export function WealthSimulator() {
  const [monthly, setMonthly] = useState(800);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const result = useMemo(() => calculateSipProjection(monthly, years, rate), [monthly, years, rate]);

  return (
    <section id="simulator" aria-label="Wealth Simulator" className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="WEALTH SIMULATOR" title="See your cashback's true potential" description="Drag the controls and expose what tiny rewards are really costing your future net worth." />
          <GlassCard className="space-y-6 p-6">
            {[
              ["Monthly cashback wasted", monthly, 100, 5000, setMonthly, "\u20B9"],
              ["Investment horizon", years, 1, 30, setYears, " years"],
              ["Annual return rate", rate, 6, 24, setRate, "% p.a."]
            ].map(([label, value, min, max, setter, suffix]) => (
              <div key={label as string}>
                <div className="mb-3 flex items-center justify-between">
                  <label className="text-sm text-[var(--text-secondary)]">{label as string}</label>
                  <span className="font-display text-xl font-bold tracking-[-0.08em] text-[var(--cobalt)]">
                    {label === "Monthly cashback wasted" ? `${"\u20B9"}${value}` : `${value}${suffix}`}
                  </span>
                </div>
                <input
                  aria-label={label as string}
                  type="range"
                  min={min as number}
                  max={max as number}
                  value={value as number}
                  onChange={(event) => (setter as Dispatch<SetStateAction<number>>)(Number(event.target.value))}
                  className="h-1 w-full appearance-none rounded-full bg-[rgba(255,255,255,0.08)] accent-[var(--cobalt)]"
                />
              </div>
            ))}
            <div className="rounded-3xl border border-[rgba(27,111,255,0.22)] bg-[rgba(27,111,255,0.08)] p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Explainable Engine</p>
              <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                Nudge basis: You&apos;ve spent {formatInr(monthly * 12)}/yr on cashback apps. Redirecting using SIP formula:
                {" "}P{"\u00D7"}((1+r/12)^(12n){"\u2212"}1)/(r/12). At {rate}% CAGR over {years} years, your passive redirection compounds into durable wealth.
              </p>
            </div>
          </GlassCard>
        </div>

        <GlassCard className="p-6 md:p-8">
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">If invested instead of wasting</p>
          <div className="mt-4 font-display text-4xl font-extrabold tracking-[-0.08em] text-[var(--mint)] md:text-[56px]">
            <NumberCounter value={result.total} formatter={(value) => formatInr(value)} duration={800} />
          </div>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">vs {formatInr(result.principal)} if kept as cashback</p>
          <div className="mt-6 h-3 rounded-full bg-[rgba(255,255,255,0.06)]">
            <div className="h-3 rounded-full bg-gradient-to-r from-[var(--cobalt)] to-[var(--mint)]" style={{ width: `${Math.max(8, (result.gain / result.total) * 100)}%` }} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ["Principal Invested", formatInr(result.principal), ""],
              ["Wealth Gained", formatInr(result.gain), "text-[var(--mint)]"],
              ["Multiplier", `${result.multiplier}${"\u00D7"}`, "text-[var(--cobalt)]"],
              ["Monthly invest", formatInr(monthly), ""]
            ].map(([label, value, color]) => (
              <div key={label} className="rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-3)] p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</p>
                <p className={`mt-2 font-display text-2xl font-bold tracking-[-0.08em] ${color}`}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.yearlyBreakdown}>
                <defs>
                  <linearGradient id="mintArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F5A0" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#00F5A0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="year" stroke="#8895AA" />
                <YAxis stroke="#8895AA" tickFormatter={(value) => `${"\u20B9"}${value / 1000}k`} />
                <Tooltip contentStyle={{ background: "#0E1420", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px" }} />
                <Area type="monotone" dataKey="value" stroke="#00F5A0" fill="url(#mintArea)" strokeWidth={3} />
                <Line type="monotone" dataKey="cashback" stroke="#FF4A6E" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6">
            <Button href="/dashboard">Start investing your cashback today {"\u2192"}</Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
