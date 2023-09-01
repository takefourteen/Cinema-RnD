import Navbar from "@/components/home-route/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden bg-[url('/dark-body-bg.jpg')] ">
      <Navbar />

      {children}
    </section>
  );
}
