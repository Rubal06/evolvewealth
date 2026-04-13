import { NextResponse } from "next/server";
import { demoMilestones } from "@/lib/demo-data";

export async function POST() {
  return NextResponse.json({
    triggeredMilestones: demoMilestones.filter((milestone) => milestone.status !== "LOCKED")
  });
}
