import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    score: 724,
    tier: "Wealth Builder",
    xp: 820,
    nextMilestone: "Freedom Fighter",
    percentile: 14
  });
}
