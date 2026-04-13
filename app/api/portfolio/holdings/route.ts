import { NextResponse } from "next/server";
import { demoHoldings } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json(demoHoldings);
}
