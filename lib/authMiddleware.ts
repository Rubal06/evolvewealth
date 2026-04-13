import { NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";

export function authMiddleware(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    };
  }

  try {
    const payload = verifyAccessToken(token);
    return {
      ok: true as const,
      payload
    };
  } catch {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Invalid token" }, { status: 401 })
    };
  }
}
