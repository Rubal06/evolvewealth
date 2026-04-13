"use client";

import { create } from "zustand";
import { demoHoldings, demoSummary } from "@/lib/demo-data";
import { Holding, PortfolioSummary } from "@/types";

interface AppState {
  summary: PortfolioSummary;
  holdings: Holding[];
  setSummary: (summary: PortfolioSummary) => void;
}

export const useAppStore = create<AppState>((set) => ({
  summary: demoSummary,
  holdings: demoHoldings,
  setSummary: (summary) => set({ summary })
}));
