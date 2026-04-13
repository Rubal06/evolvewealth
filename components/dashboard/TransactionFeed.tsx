"use client";

import { useEffect, useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { demoFeed } from "@/lib/demo-data";
import { formatInr } from "@/lib/utils";

const simulatedPool = [
  { merchantName: "Starbucks", merchantIcon: "☕", roundUp: 4, asset: "Gold" },
  { merchantName: "Zomato", merchantIcon: "🍜", roundUp: 7, asset: "ETF" },
  { merchantName: "Myntra", merchantIcon: "🛍️", roundUp: 3, asset: "Silver" },
  { merchantName: "Steam", merchantIcon: "🎮", roundUp: 18, asset: "US Tech" },
  { merchantName: "Cult.fit", merchantIcon: "🏋️", roundUp: 5, asset: "ETF" },
  { merchantName: "BookMyShow", merchantIcon: "🎬", roundUp: 2, asset: "Gold" }
];

export function TransactionFeed() {
  const [feed, setFeed] = useState(demoFeed.slice(0, 5));

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      const next = simulatedPool[index % simulatedPool.length];
      index += 1;
      setFeed((current) => [
        {
          id: `${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...next
        },
        ...current
      ].slice(0, 5));
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const total = useMemo(() => feed.reduce((sum, item) => sum + item.roundUp, 0), [feed]);

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Live Micro-Invest Feed</p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
            <span className="h-2 w-2 rounded-full bg-[var(--mint)]" style={{ animation: "pulseMint 1.8s infinite" }} />
            Live signal
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {feed.map((item) => (
          <div key={item.id} className="slide-in-top flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-3)] p-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[rgba(255,255,255,0.04)] text-lg">{item.merchantIcon}</span>
              <div>
                <p className="font-medium text-[var(--text-primary)]">{item.merchantName}</p>
                <p className="text-sm text-[var(--text-secondary)]">Round-up ₹{item.roundUp} → {item.asset}</p>
              </div>
            </div>
            <span className="font-mono text-sm text-[var(--mint)]">+{formatInr(item.roundUp)}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-5 text-sm text-[var(--text-secondary)]">Today&apos;s total: {formatInr(total)} micro-invested</div>
    </GlassCard>
  );
}
