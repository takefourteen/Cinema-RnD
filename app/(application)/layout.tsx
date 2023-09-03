import Navbar from "@/components/application-route/home/Navbar";

export default function ApplicationLayout({
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
