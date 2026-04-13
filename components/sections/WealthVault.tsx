import { GrowthGauge } from "@/components/dashboard/GrowthGauge";
import { PortfolioDonut } from "@/components/dashboard/PortfolioDonut";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { demoHoldings } from "@/lib/demo-data";
import { formatInr } from "@/lib/utils";

export function WealthVault({ dashboardMode = false }: { dashboardMode?: boolean }) {
  return (
    <section id="vault" aria-label="Wealth Vault" className={dashboardMode ? "" : "px-4 py-24 md:px-8"}>
      {!dashboardMode && (
        <div className="mx-auto max-w-7xl">
          <SectionHeading centered eyebrow="THE WEALTH VAULT" title="Every transaction builds your empire" description="Loose change auto-converts to Digital Gold, ETFs & Silver — while you sleep." />
        </div>
      )}
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-12">
        <div className="xl:col-span-6 xl:row-span-2">
          <TransactionFeed />
        </div>
        <div className="xl:col-span-6 xl:row-span-2">
          <GrowthGauge />
        </div>
        <div className="xl:col-span-4">
          <PortfolioDonut />
        </div>
        <GlassCard className="xl:col-span-8 p-6">
          <p className="mb-5 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Holdings List</p>
          <div className="space-y-4">
            {demoHoldings.map((holding) => (
              <div key={holding.asset} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-3)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{holding.asset}</h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{formatInr(holding.amount)}</p>
                  </div>
                  <div className={`text-sm font-medium ${holding.returnPct >= 0 ? "text-[var(--mint)]" : "text-[var(--danger)]"}`}>
                    {holding.returnPct >= 0 ? "+" : ""}{holding.returnPct}%
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[rgba(255,255,255,0.06)]">
                  <div className="h-2 rounded-full bg-gradient-to-r from-[var(--cobalt)] to-[var(--mint)]" style={{ width: `${Math.min(100, holding.returnPct * 3.5)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-12 xl:grid-cols-4">
          {[
            [`${"\u20B9"}32`, "Invested Today"],
            ["3", "Nudges Shown"],
            [`47-Day Streak ${"\u{1F525}"}`, "Momentum"],
            ["+12 pts", "Score Lift"]
          ].map(([value, label]) => (
            <GlassCard key={label} className="p-5">
              <div className="font-display text-2xl font-bold tracking-[-0.08em]">{value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">{label}</div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
