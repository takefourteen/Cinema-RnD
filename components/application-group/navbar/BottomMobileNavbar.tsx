"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  LibraryIcon,
  TvIcon,
  MovieIcon,
} from "@/components/ui/icons/Icons";

import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md";

type Props = {};

const BottomMobileNavbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 py-2 left-0 z-50 w-full border-t border-gray-200  lg:hidden">
      <div className=" flex h-full w-full justify-around font-semibold">
        {/* Home */}
        <BottomMobileNavbarLink
          activeLink={pathname === "/"}
          defaultIcon={<HomeIcon filled={false} />}
          text={"Home"}
        />

        {/* Movies */}
        <BottomMobileNavbarLink
          activeLink={pathname === "/explore-movies"}
          defaultIcon={<MovieIcon filled={false} />}
          text={"Movies"}
        />

        {/* Tv Series */}
        <BottomMobileNavbarLink
          activeLink={pathname === "/explore-tv-series"}
          defaultIcon={<TvIcon filled={false} />}
          text={"TV Series"}
        />

        {/* Library */}
        <BottomMobileNavbarLink
          activeLink={pathname === "/my-library"}
          defaultIcon={<MdOutlineVideoLibrary className="text-[24px] " />}
          activeIcon={<MdVideoLibrary className="text-[24px] " />}
          text={"Library"}
        />
      </div>
    </div>
  );
};

type BottomMobileNavbarLinkProps = {
  activeLink: boolean;
  defaultIcon: JSX.Element;
  activeIcon: JSX.Element;
  text: string;
};

const BottomMobileNavbarLink = ({
  activeLink,
  defaultIcon,
  activeIcon,
  text,
}: BottomMobileNavbarLinkProps) => {
  const isActive = activeLink;
  const activeClasses = "text-blue-600 dark:text-blue-500";
  const inactiveClasses = "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex flex-col items-center justify-center">
      {!isActive ? activeIcon : defaultIcon}
      <span
        className={`text-sm ${
          isActive ? activeClasses : inactiveClasses
        } group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500`}
      >
        {text}
      </span>
    </div>
  );
};

export default BottomMobileNavbar;
