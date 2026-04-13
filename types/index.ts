export type AssetType = "Digital Gold" | "Nifty 50 ETF" | "Silver Index" | "US Tech Fund";

export interface Holding {
  asset: AssetType;
  amount: number;
  units: number;
  returnPct: number;
}

export interface PortfolioSummary {
  totalValue: number;
  todaysGain: number;
  todaysGainPct: number;
  growthScore: number;
  tier: string;
  streak: number;
  xp: number;
}

export interface TransactionFeedItem {
  id: string;
  merchantName: string;
  merchantIcon: string;
  roundUp: number;
  asset: string;
  timestamp: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  description: string;
  status: "UNLOCKED" | "ACTIVE" | "LOCKED";
  xpReward: number;
  unlockHint: string;
}
