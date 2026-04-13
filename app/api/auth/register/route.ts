import { NextResponse } from "next/server";
import { z } from "zod";
import { hashPassword, signAccessToken, signRefreshToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
  phone: z.string().min(8)
});

export async function POST(request: Request) {
  try {
    const body = registerSchema.parse(await request.json());
    const existingUser = await prisma.user.findUnique({ where: { email: body.email } });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        passwordHash: await hashPassword(body.password),
        name: body.name,
        phone: body.phone
      }
    });

    const payload = { userId: user.id, email: user.email };

    return NextResponse.json({
      token: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message ?? "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Unable to register user" }, { status: 500 });
  }
}
