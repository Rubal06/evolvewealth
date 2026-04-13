import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { SiteShell } from "@/components/layout/SiteShell";
import { WealthSimulator } from "@/components/sections/WealthSimulator";

export default function SimulatorPage() {
  return (
    <SiteShell>
      <ProtectedRoute>
        <WealthSimulator />
      </ProtectedRoute>
    </SiteShell>
  );
}
