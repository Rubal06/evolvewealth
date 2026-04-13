import { Lock, Eye, Landmark, Brain, KeyRound, ClipboardList, ShieldCheck, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustItems = [
  { icon: Lock, title: "AES-256 Encrypted", description: "All financial data encrypted at rest and in transit. Zero plaintext storage ever." },
  { icon: Eye, title: "Zero Data Selling", description: "We never sell your behavioral data to advertisers, partners, or data brokers." },
  { icon: Landmark, title: "SEBI & RBI Compliant", description: "AMFI-registered. All investments routed through regulated, licensed intermediaries." },
  { icon: Brain, title: "Explainable AI", description: "Every nudge, every score, every recommendation shows you exactly why it triggered." },
  { icon: KeyRound, title: "You Own Your Data", description: "Export all your data as JSON/CSV anytime. Delete your account and all data in one click." },
  { icon: ClipboardList, title: "Audit Trail", description: "Every action is logged with timestamp. Full immutable history available to you." },
  { icon: ShieldCheck, title: "Fraud Detection", description: "Real-time anomaly detection on all transactions. Instant lock if suspicious activity detected." },
  { icon: Zap, title: "Open Banking Ready", description: "Built on Account Aggregator framework. You control consent, not us." }
];

export function TrustGrid() {
  return (
    <section id="privacy" aria-label="Trust and Transparency" className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading centered eyebrow="PRIVACY DASHBOARD" title="Your data. Your rules. Zero surprises." description="We built the only fintech app where you can see exactly why every decision was made." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[var(--obsidian-3)] p-3">
                  <Icon className="h-6 w-6 text-[var(--cobalt)]" />
                </div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.description}</p>
              </GlassCard>
            );
          })}
        </div>
        <GlassCard className="mt-8 p-6 md:p-8">
          <p className="mb-6 text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">Why did we show you this nudge?</p>
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            {[
              `Transaction detected: Zomato ${"\u20B9"}500`,
              `Rule check: Food category, 4${"\u00D7"} this week`,
              "Budget threshold: 180% over limit",
              `Projection calculated: ${"\u20B9"}1,200 by 2029`,
              `Nudge triggered ${"\u2713"}`
            ].map((node, index, array) => (
              <div key={node} className="flex items-center gap-3 xl:flex-1">
                <div className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--text-secondary)]">
                  {node}
                </div>
                {index !== array.length - 1 && (
                  <svg viewBox="0 0 90 18" className="hidden h-4 flex-1 xl:block">
                    <path d="M2 9 H88" stroke="rgba(27,111,255,0.5)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
