import Hero from "@/components/application-route/Hero";
import ColorFulBanner from "@/components/application-route/ColorFulBanner";
import FAQ from "@/components/application-route/FAQ";

export default function Home() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      <FAQ />
    </main>
  );
}
