"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { BsCollectionPlayFill, BsCollectionPlay } from "react-icons/bs";
import {
  PiHouse,
  PiHouseFill,
  PiFilmSlate,
  PiFilmSlateFill,
  PiMonitor,
  PiMonitorFill,
} from "react-icons/pi";
import { Button } from "@/components/ui/button";

const BottomMobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-2 z-10  left-1/2 transform -translate-x-1/2 w-[95%] backdrop-filter backdrop-blur-lg  rounded-full border-[1px] border-gray-700  bg-black/50  md:hidden"
      role="navigation"
      aria-label="mobile navigation"
    >
      <div className=" master-container flex h-full w-full justify-between gap-x-2 font-semibold sm:gap-x-1">
        {/* Home */}
        <BottomMobileNavbarLink
          href="/"
          activeLink={pathname === "/"}
          defaultIcon={<PiHouse className="h-full w-full" />}
          activeIcon={<PiHouseFill className="h-full w-full" />}
          text={"Home"}
        />

        {/* Movies */}
        <BottomMobileNavbarLink
          href="/explore-movies"
          activeLink={pathname === "/explore-movies"}
          defaultIcon={<PiFilmSlate className="h-full w-full" />}
          activeIcon={<PiFilmSlateFill className="h-full w-full" />}
          text={"Movies"}
        />

        {/* Tv Series */}
        <BottomMobileNavbarLink
          href="/explore-tv-series"
          activeLink={pathname === "/explore-tv-series"}
          defaultIcon={<PiMonitor className="h-full w-full" />}
          activeIcon={<PiMonitorFill className="h-full w-full" />}
          text={"TV Series"}
        />

        {/* Library */}
        <BottomMobileNavbarLink
          href="/library"
          activeLink={pathname === "/library"}
          defaultIcon={<BsCollectionPlay className="h-full w-full" />}
          activeIcon={<BsCollectionPlayFill className="h-full w-full" />}
          text={"Library"}
        />
      </div>
    </nav>
  );
};

type BottomMobileNavbarLinkProps = {
  activeLink: boolean;
  activeIcon: JSX.Element;
  defaultIcon: JSX.Element;
  href?: string;
  text: string;
};

const BottomMobileNavbarLink = ({
  activeLink,
  activeIcon,
  defaultIcon,
  href,
  text,
}: BottomMobileNavbarLinkProps) => {
  const isActive = activeLink;
  const activeClasses = "text-primaryRed dark:text-white font-semibold";
  const inactiveClasses = "text-white dark:text-white";

  return (
    <Button
      asChild
      variant="ghost"
      className={`${
        isActive
          ? "pointer-events-none  border-t-primaryRed "
          : " border-t-transparent hover:border-t-primaryRed"
      } relative h-fit w-max flex-1 flex-col rounded-none border-t-0 bg-transparent hover:opacity-80 py-1 px-0 uppercase  tracking-wide hover:bg-transparent   `}
      role="link"
      aria-label={text}
    >
      <Link href={`${href}`}>
        {/* use absolutely positioned span to add a red underline to the active link */}

        <span
          className={`${
            isActive ? activeClasses : inactiveClasses
          } text-xl sm:text-2xl`}
        >
          {isActive ? activeIcon : defaultIcon}
        </span>
        <span
          className={`font-small-text w-max ${
            isActive ? activeClasses : inactiveClasses
          } `}
        >
          {text}
        </span>
      </Link>
    </Button>
  );
};

export default BottomMobileNavbar;
