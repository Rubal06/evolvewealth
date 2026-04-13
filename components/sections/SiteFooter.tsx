import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[var(--obsidian)] px-4 py-10 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3 md:items-start">
        <div>
          <div className="font-display text-2xl font-extrabold tracking-[-0.08em]">EvolveWealth</div>
          <p className="mt-3 max-w-sm text-sm text-[var(--text-secondary)]">Stop Collecting Pennies. Start Building Empires.</p>
        </div>
        <div className="grid gap-2 text-sm text-[var(--text-secondary)]">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/simulator">Simulator</Link>
          <Link href="/shield">Shield</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/api/portfolio/summary">API Docs</Link>
        </div>
        <div className="text-sm text-[var(--text-secondary)] md:text-right">
          <div className="rounded-full border border-[rgba(255,255,255,0.08)] px-4 py-2">
            {"\u{1F3C6}"} Finvasia Innovation 2026 Entry
          </div>
          <div className="mt-4 flex justify-start gap-4 md:justify-end">
            <span aria-label="X">X</span>
            <span aria-label="LinkedIn">in</span>
            <span aria-label="GitHub">GH</span>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-[rgba(255,255,255,0.08)] pt-6 text-xs uppercase tracking-[0.16em] text-[var(--text-muted)]">
        {"\u00A9"} 2026 EvolveWealth {"\u00B7"} SEBI Compliant {"\u00B7"} Built for Gen-Z Financial Empowerment {"\u00B7"} Not investment advice.
      </div>
    </footer>
  );
}
