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

// youtube style bottom navbar, classes
const youtubeStyle =
  "fixed bottom-0 z-10 py-0.5 max-h-[50px] w-full border-t-[1px] border-t-gray-800  bg-[#000000]  md:hidden";
const customStyle =
  "fixed bottom-2 left-1/2 z-10 max-h-[50px] w-[95%] -translate-x-1/2 transform rounded-full border-[1px]  border-gray-700 bg-black/50 backdrop-blur-lg  backdrop-filter  md:hidden";

const BottomMobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav
      className={youtubeStyle}
      role="navigation"
      aria-label="mobile navigation"
    >
      <div className=" master-container flex h-full w-full justify-between gap-x-2 font-semibold sm:gap-x-1">
        {/* Home */}
        <BottomMobileNavbarLink
          href="/"
          activeLink={pathname === "/"}
          defaultIcon={<PiHouse className="text-xl sm:text-2xl" />}
          activeIcon={<PiHouseFill className="text-xl sm:text-2xl" />}
          text={"Home"}
        />

        {/* Movies */}
        <BottomMobileNavbarLink
          href="/explore-movies"
          activeLink={pathname === "/explore-movies"}
          defaultIcon={<PiFilmSlate className="text-xl sm:text-2xl" />}
          activeIcon={<PiFilmSlateFill className="text-xl sm:text-2xl" />}
          text={"Movies"}
        />

        {/* Tv Series */}
        <BottomMobileNavbarLink
          href="/explore-tv-series"
          activeLink={pathname === "/explore-tv-series"}
          defaultIcon={<PiMonitor className="text-xl sm:text-2xl" />}
          activeIcon={<PiMonitorFill className="text-xl sm:text-2xl" />}
          text={"Series"}
        />

        {/* Library */}
        <BottomMobileNavbarLink
          href="/library"
          activeLink={pathname === "/library"}
          defaultIcon={<BsCollectionPlay className="text-xl sm:text-2xl" />}
          activeIcon={<BsCollectionPlayFill className="text-xl sm:text-2xl" />}
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
      } relative h-fit w-max flex-1 flex-col rounded-none border-t-0 bg-transparent px-0 py-1 uppercase tracking-wide  hover:bg-transparent hover:opacity-80   `}
      role="link"
      aria-label={text}
    >
      <Link href={`${href}`}>
        {/* use absolutely positioned span to add a red underline to the active link */}

        <span className={`${isActive ? activeClasses : inactiveClasses} `}>
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
