import Footer from "@/components/Footer";
import Navbar from "@/components/application-group/navbar/Navbar";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-br from-[#070739] via-black/70 to-[#060212]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
