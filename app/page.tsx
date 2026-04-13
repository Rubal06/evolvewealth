import { SiteShell } from "@/components/layout/SiteShell";
import { Hero } from "@/components/sections/Hero";
import { FeatureHighlights } from "@/components/sections/FeatureHighlights";
import { LandingCta } from "@/components/sections/LandingCta";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <FeatureHighlights />
      <LandingCta />
    </SiteShell>
  );
}
