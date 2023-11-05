import { Suspense } from "react";

import Footer from "@/components/Footer";
import Navbar from "@/components/application-group/navbar/Navbar";
import BottomMobileNavbar from "@/components/application-group/navbar/BottomMobileNavbar";
import Loading from "./loading";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col overflow-x-hidden ">
      {/* use the top navbar on medium and large screens */}
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main className="flex flex-1 flex-col">
        {/* use suspense to display a loading screen while the page is loading */}
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>

      <Footer />

      {/* use the bottom navbar on small screens */}
      <BottomMobileNavbar />
    </section>
  );
}
