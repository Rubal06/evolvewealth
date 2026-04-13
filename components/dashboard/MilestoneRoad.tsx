import { demoMilestones } from "@/lib/demo-data";
import { GlassCard } from "@/components/ui/GlassCard";

export function MilestoneRoad() {
  return (
    <div className="relative space-y-4">
      <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-[var(--mint)] to-[rgba(255,255,255,0.08)]" />
      {demoMilestones.map((milestone) => (
        <GlassCard key={milestone.id} className={`group relative ml-4 p-5 ${milestone.status === "LOCKED" ? "opacity-50" : ""}`}>
          <div className="absolute -left-4 top-6 flex h-5 w-5 items-center justify-center rounded-full border border-[rgba(255,255,255,0.12)] bg-[var(--obsidian)]">
            <span className={`h-2.5 w-2.5 rounded-full ${milestone.status === "ACTIVE" ? "bg-[var(--cobalt)] shadow-[0_0_16px_rgba(27,111,255,0.8)]" : milestone.status === "UNLOCKED" ? "bg-[var(--mint)]" : "bg-[rgba(255,255,255,0.24)]"}`} />
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-medium">{milestone.title}</h3>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">{milestone.description}</p>
            </div>
            <div className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs text-[var(--text-secondary)]">+{milestone.xpReward} XP</div>
          </div>
          <div className="mt-4 text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">How to unlock: {milestone.unlockHint}</div>
        </GlassCard>
      ))}
    </div>
  );
}
