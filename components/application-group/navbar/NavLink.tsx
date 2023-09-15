import Link from "next/link";
import { Button } from "@/components/ui/button";

// component for displaying navbar links
const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  active: boolean;
}> = ({ href, active, children }) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={` relative h-fit rounded-lg px-[10px] py-[10px] text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white`}
    >
      <Link href={`${href}`}>
        {children}

        {/* use absolutely positioned span to add a red underline to the active link */}
        {active && (
          <span className="absolute bottom-0 left-0 h-1 w-full bg-[#c11119]" />
        )}
      </Link>
    </Button>
  );
};

export default NavLink;
