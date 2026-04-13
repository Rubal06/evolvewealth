"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type AppCategory = "Food" | "Grocery" | "Fashion" | "Shopping" | "Beauty" | "Entertainment" | "Gaming";

type DangerZoneApp = {
  id: string;
  name: string;
  emoji: string;
  category: AppCategory;
};

type SpendCategory =
  | "Food Delivery"
  | "Fashion"
  | "Gaming"
  | "Shopping"
  | "Entertainment"
  | "Grocery";

type PhoneUsage = "Rarely" | "Sometimes" | "Often" | "Always";

type TriggerOption =
  | "Boredom"
  | "Stress"
  | "FOMO"
  | "Late Night"
  | "Peer Pressure"
  | "Discounts";

type ShieldAiReport = {
  impulseProfile: string;
  riskWindow: string;
  annualDrain: {
    monthly: number;
    annual: number;
    threeYear: number;
    fiveYear: number;
  };
  shieldRecommendation: string;
};

const apps: DangerZoneApp[] = [
  { id: "zomato", name: "Zomato", emoji: "🍔", category: "Food" },
  { id: "swiggy", name: "Swiggy", emoji: "🍕", category: "Food" },
  { id: "blinkit", name: "Blinkit", emoji: "🛒", category: "Grocery" },
  { id: "myntra", name: "Myntra", emoji: "👕", category: "Fashion" },
  { id: "flipkart", name: "Flipkart", emoji: "📦", category: "Shopping" },
  { id: "amazon", name: "Amazon", emoji: "🎁", category: "Shopping" },
  { id: "ajio", name: "Ajio", emoji: "👗", category: "Fashion" },
  { id: "nykaa", name: "Nykaa", emoji: "💄", category: "Beauty" },
  { id: "bookmyshow", name: "BookMyShow", emoji: "🎬", category: "Entertainment" },
  { id: "steam", name: "Steam", emoji: "🎮", category: "Gaming" }
];

const defaultSelectedAppIds = ["zomato", "myntra", "steam"];
const currentYear = new Date().getFullYear();
const heatmapDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const heatmapTimeBlocks = [
  { id: "Early Morning", label: "5-8am" },
  { id: "Morning", label: "8-11am" },
  { id: "Midday", label: "11am-2pm" },
  { id: "Afternoon", label: "2-5pm" },
  { id: "Evening", label: "5-9pm" },
  { id: "Night", label: "9pm-1am" }
] as const;
const heatmapData: Record<string, number> = {
  "Mon-Night": 3,
  "Mon-Evening": 2,
  "Mon-Midday": 1,
  "Tue-Evening": 2,
  "Tue-Night": 1,
  "Wed-Morning": 1,
  "Wed-Evening": 3,
  "Wed-Night": 2,
  "Thu-Midday": 1,
  "Thu-Afternoon": 2,
  "Fri-Evening": 3,
  "Fri-Night": 3,
  "Fri-Midday": 2,
  "Sat-Morning": 2,
  "Sat-Midday": 3,
  "Sat-Afternoon": 3,
  "Sat-Evening": 3,
  "Sat-Night": 2,
  "Sun-Morning": 1,
  "Sun-Midday": 2,
  "Sun-Afternoon": 2,
  "Sun-Evening": 2,
  "Sun-Night": 3
};
const spendCategories: SpendCategory[] = [
  "Food Delivery",
  "Fashion",
  "Gaming",
  "Shopping",
  "Entertainment",
  "Grocery"
];
const phoneUsageOptions: PhoneUsage[] = ["Rarely", "Sometimes", "Often", "Always"];
const triggerOptions: TriggerOption[] = [
  "Boredom",
  "Stress",
  "FOMO",
  "Late Night",
  "Peer Pressure",
  "Discounts"
];

export function ShieldExperience() {
  const [shieldEnabled, setShieldEnabled] = useState(true);
  const [selectedAppIds, setSelectedAppIds] = useState<string[]>(defaultSelectedAppIds);
  const [selectedSimulationAppId, setSelectedSimulationAppId] = useState(defaultSelectedAppIds[0] ?? "");
  const [amount, setAmount] = useState(500);
  const [simulationCount, setSimulationCount] = useState(0);
  const [activeSimulation, setActiveSimulation] = useState<{ app: DangerZoneApp; amount: number } | null>(null);

  const selectedApps = useMemo(
    () => apps.filter((app) => selectedAppIds.includes(app.id)),
    [selectedAppIds]
  );

  useEffect(() => {
    if (selectedApps.length === 0) {
      setSelectedSimulationAppId("");
      return;
    }

    if (!selectedApps.some((app) => app.id === selectedSimulationAppId)) {
      setSelectedSimulationAppId(selectedApps[0]?.id ?? "");
    }
  }, [selectedApps, selectedSimulationAppId]);

  const selectedSimulationApp =
    selectedApps.find((app) => app.id === selectedSimulationAppId) ?? null;

  const projectedValue = useMemo(() => {
    if (!activeSimulation) {
      return Math.round(amount * 2.35);
    }

    return Math.round(activeSimulation.amount * growthMultiplier(activeSimulation.app.category));
  }, [activeSimulation, amount]);

  const explanationBullets = getNudgeReasons(selectedSimulationApp);

  function toggleApp(appId: string) {
    setSelectedAppIds((current) =>
      current.includes(appId)
        ? current.filter((id) => id !== appId)
        : [...current, appId]
    );
  }

  function triggerSimulation() {
    if (!selectedSimulationApp) {
      return;
    }

    setActiveSimulation({ app: selectedSimulationApp, amount });
    setSimulationCount((value) => value + 1);
  }

  return (
    <div className="px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[40px] border border-[var(--glass-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] px-6 py-16 text-center shadow-[0_30px_120px_rgba(0,0,0,0.45)] md:px-12">
          <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(61,251,191,0.18),transparent_65%)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_right,rgba(27,111,255,0.18),transparent_70%)]" />
          <div className="relative mx-auto max-w-4xl">
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--mint)]">
              Shield Mode
            </p>
            <h1 className="mt-5 font-display text-5xl font-extrabold tracking-[-0.08em] text-white md:text-7xl">
              Your Money&apos;s Bodyguard
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-[var(--text-secondary)] md:text-lg">
              The EvolveWealth Shield intercepts impulse purchases before they drain your
              future wealth - automatically.
            </p>

            <button
              type="button"
              aria-pressed={shieldEnabled}
              onClick={() => setShieldEnabled((value) => !value)}
              className={`shield-toggle mt-10 inline-flex min-w-[240px] items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold tracking-[0.08em] transition duration-300 ${
                shieldEnabled
                  ? "border-[rgba(61,251,191,0.55)] bg-[rgba(61,251,191,0.14)] text-[var(--mint)] shadow-[0_0_45px_rgba(61,251,191,0.3)]"
                  : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] text-[var(--text-secondary)]"
              }`}
            >
              {shieldEnabled ? "Shield Active ???" : "Shield Disabled"}
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.06em] text-white md:text-4xl">
              Choose Your Danger Zones
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] md:text-base">
              Select apps where you tend to overspend. Shield will intercept before every purchase.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {apps.map((app) => {
              const selected = selectedAppIds.includes(app.id);
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => toggleApp(app.id)}
                  className={`relative text-left transition duration-300 ${
                    selected ? "translate-y-[-2px]" : ""
                  }`}
                >
                  <GlassCard
                    className={`relative h-full min-h-[168px] border p-5 ${
                      selected
                        ? "border-[var(--cobalt)] shadow-[0_0_30px_rgba(27,111,255,0.28)]"
                        : "border-[var(--glass-border)]"
                    }`}
                  >
                    {selected && (
                      <div className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-[var(--mint)] text-xs font-bold text-[var(--obsidian)]">
                        ?
                      </div>
                    )}
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <div className="text-4xl">{app.emoji}</div>
                      <div className="mt-4 font-display text-xl font-bold text-white">{app.name}</div>
                      <div className="mt-3 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-xs text-[var(--text-secondary)]">
                        {app.category}
                      </div>
                    </div>
                  </GlassCard>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-[var(--text-secondary)]">
            Shield active on <span className="font-semibold text-[var(--mint)]">{selectedAppIds.length}</span> of 10 apps
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
            <h2 className="font-display text-3xl font-extrabold tracking-[-0.06em] text-white">
              See It In Action
            </h2>
            <div className="mt-8 space-y-6">
              <label className="block">
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">Danger zone app</span>
                <select
                  value={selectedSimulationAppId}
                  onChange={(event) => setSelectedSimulationAppId(event.target.value)}
                  disabled={selectedApps.length === 0}
                  className="w-full rounded-[20px] border border-[var(--glass-border)] bg-[var(--obsidian-2)] px-4 py-4 text-sm text-white outline-none transition focus:border-[var(--cobalt)]"
                >
                  {selectedApps.length === 0 ? (
                    <option value="">Select danger zone apps above first</option>
                  ) : (
                    selectedApps.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.emoji} {app.name}
                      </option>
                    ))
                  )}
                </select>
              </label>

              <label className="block">
                <div className="mb-3 flex items-center justify-between gap-3 text-sm text-[var(--text-secondary)]">
                  <span>Spend amount</span>
                  <span className="font-semibold text-white">?{amount}</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={800}
                  step={10}
                  value={amount}
                  onChange={(event) => setAmount(Number(event.target.value))}
                  className="w-full accent-[var(--cobalt)]"
                />
                <div className="mt-2 flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>?200</span>
                  <span>?800</span>
                </div>
              </label>

              <Button
                onClick={triggerSimulation}
                disabled={selectedApps.length === 0 || !shieldEnabled}
                className="w-full justify-center"
              >
                Trigger Simulation
              </Button>

              <ShieldWatchAnimation />

              {!shieldEnabled && (
                <p className="text-sm text-[var(--text-secondary)]">
                  Turn Shield back on to trigger a live interception.
                </p>
              )}
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="border border-[var(--glass-border)] p-6">
              <div className="mx-auto w-full max-w-[330px] rounded-[40px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,var(--obsidian),var(--obsidian-2))] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="mx-auto h-1.5 w-24 rounded-full bg-[rgba(255,255,255,0.12)]" />
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
                  <span>9:41</span>
                  <span>5G 91%</span>
                </div>
                <div className="relative mt-5 h-[410px] overflow-hidden rounded-[30px] border border-[rgba(255,255,255,0.06)] bg-[linear-gradient(180deg,var(--obsidian-2),var(--obsidian-3))] px-4 pt-4">
                  <div className="mx-auto h-6 w-28 rounded-b-2xl bg-[rgba(0,0,0,0.45)]" />

                  {activeSimulation ? (
                    <motion.div
                      key={`${activeSimulation.app.id}-${simulationCount}-${activeSimulation.amount}`}
                      initial={{ y: -80, opacity: 0 }}
                      animate={{ y: [-80, 0], opacity: [0, 1] }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="mt-6 rounded-[28px] border border-[rgba(61,251,191,0.2)] bg-[rgba(7,13,24,0.92)] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgba(27,111,255,0.16)] text-2xl">
                          {activeSimulation.app.emoji}
                        </div>
                        <div>
                          <p className="font-display text-xl font-bold text-white">
                            {activeSimulation.app.name}
                          </p>
                          <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary)]">
                            Intercepted by Shield
                          </p>
                        </div>
                      </div>
                      <p className="mt-5 text-lg font-semibold text-white">
                        You&apos;re about to spend ?{activeSimulation.amount}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                        Invested instead ? ?{projectedValue} by {currentYear + 3}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="button"
                          className="rounded-full bg-[var(--mint)] px-4 py-2 text-sm font-semibold text-[var(--obsidian)] shadow-[0_0_24px_rgba(61,251,191,0.3)]"
                        >
                          Invest Now
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[rgba(255,255,255,0.12)] px-4 py-2 text-sm text-[var(--text-secondary)]"
                        >
                          Spend anyway
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="mt-10 grid h-[280px] place-items-center rounded-[28px] border border-dashed border-[rgba(255,255,255,0.1)] text-center text-sm leading-7 text-[var(--text-secondary)]">
                      Trigger a simulation to watch Shield drop a live nudge into the phone.
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>

            <GlassCard className="border border-[var(--glass-border)] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--mint)]">
                Explainable Engine
              </p>
              <h3 className="mt-3 font-display text-2xl font-extrabold tracking-[-0.05em] text-white">
                Why this nudge?
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
                {explanationBullets.map((reason) => (
                  <li key={reason} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--mint)]" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </section>

        <ShieldLottieBanner />
        <ShieldInsightsSection />
      </div>

      <style jsx global>{`
        @keyframes shieldPulse {
          0%,
          100% {
            box-shadow: 0 0 0 rgba(61, 251, 191, 0.2), 0 0 28px rgba(61, 251, 191, 0.28);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(61, 251, 191, 0), 0 0 50px rgba(61, 251, 191, 0.4);
          }
        }

        .shield-toggle[aria-pressed="true"] {
          animation: shieldPulse 1.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

function ShieldLottieBanner() {
  return (
    <section className="overflow-hidden rounded-[36px] bg-[var(--obsidian-2)] px-6 py-10 md:px-10 md:py-12">
      <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr]">
        <div className="flex justify-center">
          <div className="grid h-[120px] w-[120px] place-items-center rounded-[28px] border border-[rgba(61,251,191,0.2)] bg-[rgba(61,251,191,0.06)] text-6xl">
            ???
          </div>
        </div>

        <div>
          <h2 className="font-display text-4xl font-extrabold tracking-[-0.06em] text-white md:text-5xl">
            Protecting your wealth, one transaction at a time
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
            Every nudge is a step toward your empire.
          </p>
          <p className="mt-6 text-2xl font-semibold text-[var(--mint)]">
            ?12,400 saved by Shield users this month
          </p>
        </div>
      </div>
    </section>
  );
}

function ShieldInsightsSection() {
  const [income, setIncome] = useState("");
  const [category, setCategory] = useState<SpendCategory>("Food Delivery");
  const [phoneUsage, setPhoneUsage] = useState<PhoneUsage>("Sometimes");
  const [lastPurchase, setLastPurchase] = useState("");
  const [triggers, setTriggers] = useState<TriggerOption[]>([]);
  const [tracksSpending, setTracksSpending] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ day: string; timeBlock: string; count: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<ShieldAiReport | null>(null);

  const shieldStrengthScore = useMemo(() => {
    const parsedIncome = Number(income) || 0;
    const parsedLastPurchase = Number(lastPurchase) || 0;
    const incomeScore =
      parsedIncome >= 90000 ? 26 : parsedIncome >= 60000 ? 21 : parsedIncome >= 45000 ? 16 : parsedIncome > 0 ? 10 : 4;
    const trackingScore = tracksSpending ? 24 : 8;
    const usageScore =
      phoneUsage === "Rarely" ? 24 : phoneUsage === "Sometimes" ? 18 : phoneUsage === "Often" ? 10 : 4;
    const triggerScore = Math.max(4, 24 - triggers.length * 4);
    const purchaseScore =
      parsedLastPurchase <= 500 ? 16 : parsedLastPurchase <= 1200 ? 11 : parsedLastPurchase > 0 ? 6 : 8;

    return Math.max(0, Math.min(100, incomeScore + trackingScore + usageScore + triggerScore + purchaseScore));
  }, [income, lastPurchase, phoneUsage, tracksSpending, triggers]);

  async function analyseBehaviour() {
    setIsLoading(true);
    setError("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey) {
        throw new Error("Missing NEXT_PUBLIC_ANTHROPIC_API_KEY");
      }

      const parsedIncome = Number(income) || 0;
      const parsedLastPurchase = Number(lastPurchase) || 0;
      const prompt = `You are Shield AI, a behavioral finance analyst for EvolveWealth - a Gen-Z micro-investing app. Analyse this user's spending behaviour profile and return a JSON object with exactly these keys: impulseProfile (string, 2-3 sentences), riskWindow (string, 1-2 sentences identifying highest risk time/situation), annualDrain (object with keys monthly (number), annual (number), threeYear (number), fiveYear (number) - all in INR, calculated from their income and impulse patterns), shieldRecommendation (string, 2-3 sentences of specific actionable Shield config advice). Be direct, specific, and use Indian financial context. User profile: Income: ?${parsedIncome}/month, Impulse category: ${category}, Phone usage after 9pm: ${phoneUsage}, Last impulse purchase: ?${parsedLastPurchase}, Triggers: ${triggers.length > 0 ? triggers.join(", ") : "None provided"}, Tracks spending: ${tracksSpending ? "Yes" : "No"}. Return only valid JSON, no markdown, no explanation.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 900,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error(`Anthropic request failed with ${response.status}`);
      }

      const data = (await response.json()) as {
        content?: Array<{ type?: string; text?: string }>;
      };
      const rawText = data.content?.find((item) => item.type === "text")?.text?.trim() ?? "";
      setReport(parseShieldAiReport(rawText));
    } catch {
      setReport(null);
      setError("Shield AI couldn't parse the response. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-6">
      <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--mint)]">Behavioral Pattern</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.06em] text-white md:text-4xl">
          Weekly Intercept Map
        </h2>

        <div className="mt-8 overflow-x-auto">
          <div className="relative min-w-[720px]">
            <div className="grid grid-cols-[140px_repeat(7,minmax(72px,1fr))] gap-3 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              <div />
              {heatmapDays.map((day) => (
                <div key={day} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-3">
              {heatmapTimeBlocks.map((timeBlock, rowIndex) => (
                <div
                  key={timeBlock.id}
                  className="grid grid-cols-[140px_repeat(7,minmax(72px,1fr))] items-center gap-3"
                >
                  <div className="pr-3 text-sm text-[var(--text-secondary)]">
                    <div className="font-medium text-white">{timeBlock.id}</div>
                    <div className="mt-1 text-xs">{timeBlock.label}</div>
                  </div>

                  {heatmapDays.map((day, columnIndex) => {
                    const count = heatmapData[`${day}-${timeBlock.id}`] ?? 0;

                    return (
                      <motion.button
                        key={`${day}-${timeBlock.id}`}
                        type="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          duration: 0.22,
                          delay: (rowIndex * heatmapDays.length + columnIndex) * 0.008
                        }}
                        onMouseEnter={() =>
                          setHoveredCell({ day, timeBlock: timeBlock.id, count })
                        }
                        onMouseLeave={() =>
                          setHoveredCell((current) =>
                            current?.day === day && current.timeBlock === timeBlock.id ? null : current
                          )
                        }
                        onFocus={() => setHoveredCell({ day, timeBlock: timeBlock.id, count })}
                        onBlur={() =>
                          setHoveredCell((current) =>
                            current?.day === day && current.timeBlock === timeBlock.id ? null : current
                          )
                        }
                        className="relative h-14 rounded-[18px] border border-[rgba(255,255,255,0.05)] transition-transform duration-200 hover:scale-[1.03]"
                        style={{
                          backgroundColor: getHeatmapColor(count),
                          boxShadow: count >= 3 ? "0 0 12px rgba(27,111,255,0.5)" : "none"
                        }}
                        aria-label={`${day} ${timeBlock.id} - ${count} nudge${count === 1 ? "" : "s"} blocked`}
                      >
                        <span className="text-xs font-medium text-white/80">{count}</span>
                        {hoveredCell?.day === day && hoveredCell.timeBlock === timeBlock.id ? (
                          <div className="pointer-events-none absolute -top-11 left-1/2 z-10 -translate-x-1/2 rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(7,13,24,0.92)] px-3 py-1 text-[11px] text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
                            {day} {timeBlock.id} - {count} nudge{count === 1 ? "" : "s"} blocked
                          </div>
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map((level) => (
              <div key={level} className="flex items-center gap-2">
                <span
                  className="h-4 w-4 rounded-md border border-[rgba(255,255,255,0.06)]"
                  style={{
                    backgroundColor: getHeatmapColor(level),
                    boxShadow: level >= 3 ? "0 0 12px rgba(27,111,255,0.5)" : "none"
                  }}
                />
                <span>{level >= 3 ? "3+" : level}</span>
              </div>
            ))}
          </div>
          <span>Darker = more impulse purchases intercepted by Shield.</span>
        </div>
      </GlassCard>

      <GlassCard className="border border-[var(--glass-border)] p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--mint)]">Shield AI Lab</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.06em] text-white md:text-4xl">
          Train Shield On Your Real Behaviour
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <GlassCard className="border border-[var(--glass-border)] bg-[rgba(7,13,24,0.68)] p-5">
            <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-white">
              Your Spend Profile
            </h3>

            <div className="mt-6 space-y-5">
              <label className="block">
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">Monthly income</span>
                <div className="flex items-center rounded-[20px] border border-[var(--glass-border)] bg-[var(--obsidian-2)] px-4 py-3 focus-within:border-[var(--cobalt)]">
                  <span className="mr-2 text-sm text-[var(--text-secondary)]">?</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="45000"
                    value={income}
                    onChange={(event) => setIncome(event.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">Biggest impulse category</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value as SpendCategory)}
                  className="w-full rounded-[20px] border border-[var(--glass-border)] bg-[var(--obsidian-2)] px-4 py-4 text-sm text-white outline-none transition focus:border-[var(--cobalt)]"
                >
                  {spendCategories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">
                  How often do you check your phone after 9pm?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {phoneUsageOptions.map((option) => {
                    const active = phoneUsage === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setPhoneUsage(option)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          active
                            ? "border-[var(--cobalt)] bg-[rgba(27,111,255,0.22)] text-white shadow-[0_0_24px_rgba(27,111,255,0.18)]"
                            : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="block">
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">Last impulse purchase amount</span>
                <div className="flex items-center rounded-[20px] border border-[var(--glass-border)] bg-[var(--obsidian-2)] px-4 py-3 focus-within:border-[var(--cobalt)]">
                  <span className="mr-2 text-sm text-[var(--text-secondary)]">?</span>
                  <input
                    type="number"
                    inputMode="numeric"
                    placeholder="800"
                    value={lastPurchase}
                    onChange={(event) => setLastPurchase(event.target.value)}
                    className="w-full bg-transparent text-sm text-white outline-none"
                  />
                </div>
              </label>

              <div>
                <span className="mb-3 block text-sm text-[var(--text-secondary)]">
                  What triggers your impulse buys?
                </span>
                <div className="flex flex-wrap gap-2">
                  {triggerOptions.map((option) => {
                    const active = triggers.includes(option);
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setTriggers((current) =>
                            current.includes(option)
                              ? current.filter((item) => item !== option)
                              : [...current, option]
                          )
                        }
                        className={`rounded-full border px-4 py-2 text-sm transition ${
                          active
                            ? "border-[var(--cobalt)] bg-[rgba(27,111,255,0.22)] text-white shadow-[0_0_18px_rgba(27,111,255,0.2)]"
                            : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between rounded-[20px] border border-[var(--glass-border)] bg-[var(--obsidian-2)] px-4 py-4">
                <div>
                  <p className="text-sm text-white">Do you track your spending?</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Shield uses this to tune the strength score.
                  </p>
                </div>
                <button
                  type="button"
                  aria-pressed={tracksSpending}
                  onClick={() => setTracksSpending((value) => !value)}
                  className={`relative inline-flex h-9 w-16 items-center rounded-full border transition ${
                    tracksSpending
                      ? "border-[var(--cobalt)] bg-[rgba(27,111,255,0.24)]"
                      : "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.05)]"
                  }`}
                >
                  <motion.span
                    animate={{ x: tracksSpending ? 28 : 4 }}
                    transition={{ type: "spring", stiffness: 320, damping: 24 }}
                    className="absolute grid h-7 w-7 place-items-center rounded-full bg-white text-[10px] font-bold text-[var(--obsidian)]"
                  >
                    {tracksSpending ? "YES" : "NO"}
                  </motion.span>
                </button>
              </div>

              <Button
                onClick={analyseBehaviour}
                disabled={isLoading}
                className="w-full justify-center"
              >
                {isLoading ? (
                  <span className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--cobalt)]" />
                    Shield AI is thinking...
                  </span>
                ) : (
                  "Analyse My Behaviour ?"
                )}
              </Button>
            </div>
          </GlassCard>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[var(--cobalt)] shadow-[0_0_20px_rgba(27,111,255,0.7)]" />
              <h3 className="font-display text-2xl font-bold tracking-[-0.05em] text-white">
                Shield AI Report
              </h3>
            </div>

            {error ? (
              <GlassCard className="border border-[rgba(255,99,132,0.22)] bg-[rgba(30,12,18,0.7)] p-5 text-sm text-[rgb(255,180,196)]">
                {error}
              </GlassCard>
            ) : null}

            <AnimatePresence mode="wait">
              {report ? (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {[
                    { title: "?? Your Impulse Profile", content: report.impulseProfile },
                    { title: "?? Highest Risk Window", content: report.riskWindow },
                    {
                      title: "?? Annual Drain Estimate",
                      content: `?${formatCurrency(report.annualDrain.monthly)}/month leaking becomes ?${formatCurrency(report.annualDrain.annual)}/year, ?${formatCurrency(report.annualDrain.threeYear)} over 3 years, and ?${formatCurrency(report.annualDrain.fiveYear)} over 5 years.`
                    },
                    { title: "??? Shield Config Recommendation", content: report.shieldRecommendation }
                  ].map((card, index) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, delay: index * 0.08 }}
                    >
                      <GlassCard className="border border-[var(--glass-border)] bg-[rgba(7,13,24,0.72)] p-5">
                        <p className="text-sm font-semibold text-white">{card.title}</p>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                          {card.content}
                        </p>
                      </GlassCard>
                    </motion.div>
                  ))}

                  <GlassCard className="border border-[rgba(27,111,255,0.2)] bg-[rgba(7,13,24,0.72)] p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">Shield Strength Score</p>
                      <span className="font-display text-2xl font-bold text-[var(--cobalt)]">
                        {shieldStrengthScore}
                      </span>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${shieldStrengthScore}%` }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="h-full rounded-full bg-[linear-gradient(90deg,rgba(27,111,255,0.7),rgba(61,251,191,0.8))]"
                      />
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="grid min-h-[420px] place-items-center rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-8 text-center"
                >
                  <div>
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-3xl">
                      ??
                    </div>
                    <p className="mt-5 max-w-md text-sm leading-7 text-[var(--text-secondary)]">
                      Fill in your spend profile and run the analysis to get a personalised Shield report.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}

function ShieldWatchAnimation() {
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadAnimation() {
      try {
        const response = await fetch("/animations/shield.json");
        if (!response.ok) {
          throw new Error("Missing shield animation");
        }

        const data = (await response.json()) as object;
        if (mounted) {
          setAnimationData(data);
        }
      } catch {
        if (mounted) {
          setAnimationData(null);
        }
      }
    }

    loadAnimation();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="flex h-[280px] w-[280px] items-center justify-center">
        {animationData ? <Lottie animationData={animationData} loop autoplay /> : null}
      </div>
      <p className="mt-4 text-center text-sm text-[#00F5A0]">Shield is watching</p>
    </div>
  );
}

function getNudgeReasons(app: DangerZoneApp | null) {
  if (!app) {
    return [
      "Pick a danger zone app to see the signals Shield uses before it interrupts a spend.",
      "The engine combines your category budget, recent streak, and frequency patterns.",
      "Each nudge reframes impulse spending as a visible investment tradeoff."
    ];
  }

  if (app.category === "Food") {
    return [
      `${app.name} has become a high-frequency spend this week, so Shield steps in before the habit compounds.`,
      "Your food budget is running hot, and this nudge protects the rest of the week's allocation.",
      "Redirecting one meal order now keeps your daily micro-invest streak alive."
    ];
  }

  if (app.category === "Fashion") {
    return [
      `${app.name} sits in your style category, where you are nearing this month's discretionary limit.`,
      "Shield compares this purchase against your monthly fashion cap before you check out.",
      "Skipping one trend purchase now frees cash for higher-conviction wealth moves."
    ];
  }

  if (app.category === "Gaming") {
    return [
      `${app.name} is tagged as discretionary spend, so Shield nudges when a purchase looks optional.`,
      "Gaming spend has been elevated lately, and this catch helps cool the category before it snowballs.",
      "Reallocating even one impulse buy into investing compounds faster than another short-lived unlock."
    ];
  }

  return [
    `${app.name} is currently a vulnerable category for impulse spending, so Shield watches it closely.`,
    "This nudge compares today's spend against your recent pattern and available category budget.",
    "Investing the same amount now protects progress toward your next milestone instead of delaying it."
  ];
}

function growthMultiplier(category: AppCategory) {
  switch (category) {
    case "Food":
      return 2.4;
    case "Fashion":
      return 2.7;
    case "Gaming":
      return 2.55;
    default:
      return 2.3;
  }
}

function getHeatmapColor(count: number) {
  if (count >= 3) {
    return "rgba(27,111,255,0.75)";
  }

  if (count === 2) {
    return "rgba(27,111,255,0.4)";
  }

  if (count === 1) {
    return "rgba(27,111,255,0.2)";
  }

  return "rgba(255,255,255,0.04)";
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
  }).format(Math.round(value));
}

function parseShieldAiReport(rawText: string): ShieldAiReport {
  const normalized = rawText
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  const parsed = JSON.parse(normalized) as Partial<ShieldAiReport>;
  const annualDrain = parsed.annualDrain as Partial<ShieldAiReport["annualDrain"]> | undefined;

  if (
    typeof parsed.impulseProfile !== "string" ||
    typeof parsed.riskWindow !== "string" ||
    typeof parsed.shieldRecommendation !== "string" ||
    typeof annualDrain?.monthly !== "number" ||
    typeof annualDrain.annual !== "number" ||
    typeof annualDrain.threeYear !== "number" ||
    typeof annualDrain.fiveYear !== "number"
  ) {
    throw new Error("Invalid Shield AI payload");
  }

  return {
    impulseProfile: parsed.impulseProfile,
    riskWindow: parsed.riskWindow,
    annualDrain: {
      monthly: annualDrain.monthly,
      annual: annualDrain.annual,
      threeYear: annualDrain.threeYear,
      fiveYear: annualDrain.fiveYear
    },
    shieldRecommendation: parsed.shieldRecommendation
  };
}
