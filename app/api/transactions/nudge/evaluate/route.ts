import { NextResponse } from "next/server";
import { z } from "zod";
import { evaluateNudge } from "@/lib/nudgeEngine";

const schema = z.object({
  merchantName: z.string(),
  merchantCategory: z.string(),
  amount: z.number()
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json(evaluateNudge(body));
}
