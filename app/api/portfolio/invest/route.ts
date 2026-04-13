import { NextResponse } from "next/server";
import { z } from "zod";

const investSchema = z.object({
  amount: z.number().positive(),
  assetType: z.string().min(2)
});

export async function POST(request: Request) {
  const body = investSchema.parse(await request.json());

  return NextResponse.json({
    success: true,
    message: "Investment simulated successfully",
    investment: {
      amount: body.amount,
      assetType: body.assetType,
      status: "processed"
    }
  });
}
