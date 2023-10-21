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
      className={`${
        active
          ? "pointer-events-none  border-b-primaryRed "
          : " border-b-transparent hover:border-b-primaryRed"
      } font-small-text relative h-fit rounded-none border-b-2 bg-transparent px-[10px] py-[8px] text-sm uppercase tracking-wide font-bold text-white hover:bg-transparent hover:text-white dark:text-white lg:border-b-3 `}
    >
      <Link href={`${href}`}>{children}</Link>
    </Button>
  );
};

export default NavLink;
