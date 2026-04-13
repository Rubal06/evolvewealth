import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SiteShell } from "@/components/layout/SiteShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { WealthVault } from "@/components/sections/WealthVault";

const today = new Intl.DateTimeFormat("en-IN", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric"
}).format(new Date());

export default function DashboardPage() {
  return (
    <SiteShell>
      <ProtectedRoute>
        <section className="px-4 py-12 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">{today}</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold tracking-[-0.08em] md:text-5xl">
                Welcome back, Arjun {"\u{1F44B}"}
              </h1>
            </div>
            <div className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [`${"\u20B9"}11,780`, "Total Wealth"],
                [`${"\u20B9"}32`, "Today's Investment"],
                ["47 days", "Current Streak"],
                ["724", "Growth Score"]
              ].map(([value, label]) => (
                <GlassCard key={label} className="p-5">
                  <div className="font-display text-3xl font-extrabold tracking-[-0.08em]">{value}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">{label}</div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
        <WealthVault dashboardMode />
      </ProtectedRoute>
    </SiteShell>
  );
}
