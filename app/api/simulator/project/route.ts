import { NextResponse } from "next/server";
import { calculateSipProjection } from "@/lib/simulator";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const monthly = Number(searchParams.get("monthly") ?? "800");
  const years = Number(searchParams.get("years") ?? "10");
  const rate = Number(searchParams.get("rate") ?? "12");

  return NextResponse.json(calculateSipProjection(monthly, years, rate));
}
