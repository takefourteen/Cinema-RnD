import Link from "next/link";
import { Button } from "@/components/ui/button";

// component for displaying navbar links
const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-fit rounded-lg px-[10px] py-[10px] text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
    >
      <Link href={`${href}`}>{children}</Link>
    </Button>
  );
};

export default NavLink;
