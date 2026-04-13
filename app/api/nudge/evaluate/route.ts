import { NextResponse } from "next/server";
import { z } from "zod";
import { evaluateNudge } from "@/lib/nudgeEngine";

const schema = z.object({
  merchantName: z.string(),
  merchantCategory: z.string(),
  amount: z.number(),
  weeklyFoodSpend: z.number().optional(),
  weeklyFoodBudget: z.number().optional(),
  monthlyCategorySpend: z.number().optional(),
  monthlyCategoryBudget: z.number().optional(),
  sameMerchantVisitsThisWeek: z.number().optional()
});

export async function POST(request: Request) {
  const body = schema.parse(await request.json());
  return NextResponse.json(evaluateNudge(body));
}
