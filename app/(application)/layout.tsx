import Footer from "@/components/Footer";
import Navbar from "@/components/application-group/navbar/Navbar";
import BottomMobileNavbar from "@/components/application-group/navbar/BottomMobileNavbar";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden ">
      {/* use the top navbar on medium and large screens */}
      <Navbar />

      <main className="flex flex-col flex-1">{children}</main>

      <Footer />

      {/* use the bottom navbar on small screens */}
      <BottomMobileNavbar />
    </section>
  );
}
