import { NextResponse } from "next/server";
import { z } from "zod";
import { signAccessToken, verifyRefreshToken } from "@/lib/auth";

const refreshSchema = z.object({
  refreshToken: z.string().min(10)
});

export async function POST(request: Request) {
  const body = refreshSchema.parse(await request.json());
  const payload = verifyRefreshToken(body.refreshToken);

  return NextResponse.json({
    token: signAccessToken(payload)
  });
}
