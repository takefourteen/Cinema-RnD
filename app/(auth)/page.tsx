import Hero from "@/components/home-route/Hero";
import ColorFulBanner from "@/components/home-route/ColorFulBanner";
import FAQ from "@/components/home-route/FAQ";

export default function Home() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      <FAQ />

    </main>
  );
}
