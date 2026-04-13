"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
  phone: z.string().min(8)
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const schema = mode === "login" ? loginSchema : registerSchema;
  const nextPath = searchParams.get("next") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  useEffect(() => {
    const token = window.localStorage.getItem("ew-token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  const onSubmit = async (values: Record<string, unknown>) => {
    setError(null);
    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    let payload: Record<string, unknown> = {};
    try {
      payload = (await response.json()) as Record<string, unknown>;
    } catch {
      payload = {};
    }

    if (!response.ok) {
      setError(typeof payload.error === "string" ? payload.error : "Something went wrong.");
      return;
    }

    if (typeof payload.token !== "string") {
      setError("Something went wrong.");
      return;
    }

    window.localStorage.setItem("ew-token", payload.token);
    if (typeof payload.refreshToken === "string") {
      window.localStorage.setItem("ew-refresh-token", payload.refreshToken);
    }
    router.push(mode === "register" ? "/dashboard" : nextPath);
  };

  return (
    <GlassCard className="mx-auto w-full max-w-md p-8">
      <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-secondary)]">
        {mode === "login" ? "Access Your Vault" : "Create Your Account"}
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-[-0.08em]">
        {mode === "login" ? "Welcome back" : "Join EvolveWealth"}
      </h1>
      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
        {mode === "login"
          ? "Log in to continue building your empire."
          : "Create your profile and start redirecting cashback into real wealth."}
      </p>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {mode === "register" && (
          <>
            <Field label="Full name" error={toErrorMessage(errors.name?.message)}>
              <input {...register("name" as const)} className="auth-input" />
            </Field>
            <Field label="Phone" error={toErrorMessage(errors.phone?.message)}>
              <input {...register("phone" as const)} className="auth-input" />
            </Field>
          </>
        )}
        <Field label="Email" error={toErrorMessage(errors.email?.message)}>
          <input {...register("email")} type="email" className="auth-input" />
        </Field>
        <Field label="Password" error={toErrorMessage(errors.password?.message)}>
          <input {...register("password")} type="password" className="auth-input" />
        </Field>

        {error && <p className="text-sm text-[var(--danger)]">{error}</p>}

        <Button className="w-full justify-center">
          {isSubmitting ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-[var(--text-secondary)]">
        {mode === "login" ? "Need an account?" : "Already have an account?"}{" "}
        <Link href={mode === "login" ? "/register" : "/login"} className="text-[var(--cobalt)]">
          {mode === "login" ? "Register" : "Log in"}
        </Link>
      </p>
    </GlassCard>
  );
}

function toErrorMessage(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-[var(--text-secondary)]">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-[var(--danger)]">{error}</span>}
    </label>
  );
}
