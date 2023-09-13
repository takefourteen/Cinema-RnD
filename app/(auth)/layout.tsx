import Navbar from "@/components/auth-group/Navbar";
import Footer from "@/components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden bg-[url('/body-bg.svg')] text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
