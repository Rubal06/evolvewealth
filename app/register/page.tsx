import { Suspense } from "react";
import { SiteShell } from "@/components/layout/SiteShell";
import { AuthForm } from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <SiteShell>
      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <Suspense fallback={<div className="section-shell" />}>
            <AuthForm mode="register" />
          </Suspense>
        </div>
      </section>
    </SiteShell>
  );
}
