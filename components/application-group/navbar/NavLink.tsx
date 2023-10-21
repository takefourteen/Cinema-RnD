import Link from "next/link";

// component for displaying navbar links
const NavLink: React.FC<{
  href: string;
  children: React.ReactNode;
  active: boolean;
}> = ({ href, active, children }) => {
  return (
    <Link
      href={`${href}`}
      className={`${
        active
          ? "pointer-events-none  border-b-primaryRed "
          : " border-b-transparent hover:border-b-primaryRed"
      } font-small-text relative h-fit rounded-none border-b-2 bg-transparent px-[10px] py-[8px] text-sm font-bold uppercase tracking-wide text-white hover:bg-transparent hover:text-white dark:text-white lg:border-b-3 `}
      role="link"
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

export default NavLink;
