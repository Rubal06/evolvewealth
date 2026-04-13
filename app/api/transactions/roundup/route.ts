import { NextResponse } from "next/server";
import { z } from "zod";

const roundupSchema = z.object({
  merchantName: z.string(),
  category: z.string(),
  amount: z.number().positive(),
  userId: z.string()
});

export async function POST(request: Request) {
  const body = roundupSchema.parse(await request.json());
  const roundedTarget = Math.ceil(body.amount / 10) * 10;
  const roundUp = Number((roundedTarget - body.amount).toFixed(2));

  return NextResponse.json({
    merchantName: body.merchantName,
    category: body.category,
    amount: body.amount,
    roundUp,
    investedInto: "Nifty 50 ETF"
  });
}
