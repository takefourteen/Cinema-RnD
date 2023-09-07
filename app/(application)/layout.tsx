import Navbar from "@/components/application-group/Navbar";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-x-hidden bg-gradient-to-tr from-[#070739] via-black to-[#060212]">
      <Navbar />
      {children}
    </section>
  );
}
