import Footer from "@/components/Footer";
import Navbar from "@/components/application-group/navbar/Navbar";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden ">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </section>
  );
}
