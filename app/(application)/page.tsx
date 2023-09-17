import Hero from "@/components/application-group/home-route/hero-section/Hero";
import ColorFulBanner from "@/components/application-group/home-route/ColorFulBanner";
import FAQ from "@/components/application-group/home-route/FAQ";
import Discovery from "@/components/application-group/home-route/Discovery";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      <Discovery />
      <Separator className="h-[6px] bg-slate-600" />
      <FAQ />
    </main>
  );
}
