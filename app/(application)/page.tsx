import { Suspense } from "react";

import { Separator } from "@/components/ui/separator";
import Hero from "@/components/application-group/home-route/hero-section/Hero";
import ColorFulBanner from "@/components/application-group/home-route/ColorFulBanner";
import FAQ from "@/components/application-group/home-route/FAQ";
import Discovery from "@/components/application-group/home-route/Discovery";
import LoadingSpinner from "@/components/LoadingSpinner";

// ===================================
// Time-based Revalidation in Next.js
// ===================================
export const revalidate = 3600 * 24; // 1 day

export default function Page() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      {/* <Suspense fallback={<LoadingSpinner />}>
        <Discovery />
      </Suspense> */}
      <Separator className="h-[6px] bg-slate-600" />
      <FAQ />
    </main>
  );
}
