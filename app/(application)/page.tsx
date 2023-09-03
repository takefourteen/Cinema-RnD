import Hero from "@/components/application-route/home/Hero";
import ColorFulBanner from "@/components/application-route/home/ColorFulBanner";
import FAQ from "@/components/application-route/home/FAQ";

export default function Page() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      <FAQ />
    </main>
  );
}
