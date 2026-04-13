import { NextResponse } from "next/server";
import { demoFeed } from "@/lib/demo-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? "1");
  const pageSize = Number(searchParams.get("pageSize") ?? "10");
  const start = (page - 1) * pageSize;
  const items = demoFeed.slice(start, start + pageSize);

  return NextResponse.json({
    page,
    pageSize,
    total: demoFeed.length,
    items
  });
}
