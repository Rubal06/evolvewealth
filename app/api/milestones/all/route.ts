import { NextResponse } from "next/server";
import { demoMilestones } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json(demoMilestones);
}
