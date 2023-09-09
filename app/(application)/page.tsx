import Hero from "@/components/application-group/home/Hero";
import ColorFulBanner from "@/components/application-group/home/ColorFulBanner";
import FAQ from "@/components/application-group/home/FAQ";
import Discovery from "@/components/application-group/home/Discovery";

export default function Page() {
  return (
    <main className="text-white">
      <Hero />
      <ColorFulBanner />
      <Discovery />
      <FAQ />
    </main>
  );
}
