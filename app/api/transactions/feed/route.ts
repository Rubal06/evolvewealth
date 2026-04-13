import { NextResponse } from "next/server";
import { demoFeed } from "@/lib/demo-data";

export async function GET() {
  return NextResponse.json(demoFeed.slice(0, 20));
}
