import Navbar from "@/components/auth-route/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden min-h-screen text-white bg-[url('/body-bg.svg')] ">
      <Navbar />

      {children}
    </section>
  );
}
