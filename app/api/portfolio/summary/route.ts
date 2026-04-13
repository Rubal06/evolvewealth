import { NextResponse } from "next/server";
import { demoSummary } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json(demoSummary);
}
