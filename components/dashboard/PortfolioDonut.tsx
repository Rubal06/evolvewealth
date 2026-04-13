"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { GlassCard } from "@/components/ui/GlassCard";

const data = [
  { name: "Gold", value: 37, color: "#1B6FFF" },
  { name: "Nifty ETF", value: 25, color: "#00F5A0" },
  { name: "Silver", value: 13, color: "#FFAA2C" },
  { name: "US Tech", value: 25, color: "#5B5BD6" }
];

export function PortfolioDonut() {
  return (
    <GlassCard className="h-full p-6">
      <p className="mb-4 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Portfolio Mix</p>
      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={75} outerRadius={100} stroke="transparent" paddingAngle={4}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="font-display text-4xl font-extrabold tracking-[-0.08em]">₹11,780</div>
            <div className="text-sm text-[var(--text-secondary)]">Total Wealth</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map((item) => (
          <span key={item.name} className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[var(--text-secondary)]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
            {item.name}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
