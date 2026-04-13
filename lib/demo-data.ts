import { Holding, MilestoneItem, PortfolioSummary, TransactionFeedItem } from "@/types";

export const demoSummary: PortfolioSummary = {
  totalValue: 11780,
  todaysGain: 232,
  todaysGainPct: 2.01,
  growthScore: 724,
  tier: "Wealth Builder",
  streak: 47,
  xp: 820
};

export const demoHoldings: Holding[] = [
  { asset: "Digital Gold", amount: 4230, units: 7.4, returnPct: 18.2 },
  { asset: "Nifty 50 ETF", amount: 2890, units: 16.3, returnPct: 12.4 },
  { asset: "Silver Index", amount: 1560, units: 22.6, returnPct: 6.1 },
  { asset: "US Tech Fund", amount: 3100, units: 10.2, returnPct: 22.8 }
];

export const demoFeed: TransactionFeedItem[] = [
  { id: "1", merchantName: "Starbucks", merchantIcon: "☕", roundUp: 4, asset: "Gold", timestamp: new Date().toISOString() },
  { id: "2", merchantName: "Zomato", merchantIcon: "🍜", roundUp: 7, asset: "ETF", timestamp: new Date().toISOString() },
  { id: "3", merchantName: "Myntra", merchantIcon: "🛍️", roundUp: 3, asset: "Silver", timestamp: new Date().toISOString() },
  { id: "4", merchantName: "Steam", merchantIcon: "🎮", roundUp: 18, asset: "US Tech", timestamp: new Date().toISOString() },
  { id: "5", merchantName: "Cult.fit", merchantIcon: "🏋️", roundUp: 5, asset: "ETF", timestamp: new Date().toISOString() },
  { id: "6", merchantName: "BookMyShow", merchantIcon: "🎬", roundUp: 2, asset: "Gold", timestamp: new Date().toISOString() }
];

export const demoMilestones: MilestoneItem[] = [
  { id: "seed", title: "Seed Planted", description: "First ₹100 invested", status: "UNLOCKED", xpReward: 50, unlockHint: "Maintain your first investment streak." },
  { id: "sapling", title: "Sapling Stage", description: "30-day streak achieved", status: "UNLOCKED", xpReward: 120, unlockHint: "Keep auto-investing for 30 days." },
  { id: "builder", title: "Wealth Builder", description: "Portfolio crossed ₹10,000", status: "ACTIVE", xpReward: 300, unlockHint: "You're here. Keep momentum alive." },
  { id: "fighter", title: "Freedom Fighter", description: "Reach ₹1L portfolio", status: "LOCKED", xpReward: 600, unlockHint: "Invest ₹88,220 more to unlock." },
  { id: "empire", title: "Empire Mode", description: "₹10L+ wealth achieved", status: "LOCKED", xpReward: 2000, unlockHint: "Sustain long-term compounding to unlock." }
];
