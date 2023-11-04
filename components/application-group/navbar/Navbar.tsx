"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import type { UserProfileData } from "@/components/application-group/navbar/ProfileMenu";

import { signOutUser } from "@/lib/auth-api/sign-out";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import SearchBar from "./SearchBar";
import NavLink from "./NavLink";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = `${pathname}?${searchParams}`;
  const { data: session, status } = useSession();

  const [scroll, setScroll] = useState(false);
  const [darkenBackground, setDarkenBackground] = useState<boolean>(false);
  const isScreenWithoutNavbarScrollEffect = [
    "search",
    "explore-movies",
    "explore-tv-series",
    "library",
    "watch-movie",
    "watch-tv",
  ].includes(pathname.split("/")[1]);
  const scrollThreshold = 90; // Adjust this threshold as needed

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  function toggleNavBarBgColor() {
    setDarkenBackground((prev) => !prev);
  }

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/");
    router.refresh();
  };

  /*
    Define classes based on the scroll state, whether the search icon is clicked, and 
    is darkenBackground is true or false
  */
  const otherScreensNavbarClasses = `fixed transition-colors top-0 left-0 right-0 z-[15] ${
    scroll || darkenBackground
      ? "bg-black"
      : "bg-gradient-to-b from-black via-black/50 to-transparent"
  }`;

  const screenWithoutNavbarScrollEffectClasses = `fixed transition-colors top-0 left-0 right-0 z-[15] bg-black/90`;

  return (
    <>
      <nav
        className={
          isScreenWithoutNavbarScrollEffect
            ? screenWithoutNavbarScrollEffectClasses
            : otherScreensNavbarClasses
        }
      >
        <section className="master-container flex h-[75px] items-center justify-between px-4 py-2 lg:h-[90px]">
          {/* display logo */}
          <div className="mr-4 flex items-center">
            <Link href="/">
              {/* show lg logo on lg screens */}
              <Image
                src={logo}
                alt="Cozy Cinema Logo"
                width={125}
                priority
                sizes="(max-width: 640px) 90px, (max-width: 1024px) 100px, 125px"
                className="max-w-[90px] sm:max-w-[100px] lg:max-w-[125px] "
              />
            </Link>
          </div>

          {/* menu for lg screens */}
          <div className="hidden  gap-x-2  uppercase md:flex">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>
            <NavLink
              href="/explore-movies"
              active={pathname === "/explore-movies"}
            >
              movies
            </NavLink>
            <NavLink
              href="/explore-tv-series"
              active={pathname === "/explore-tv-series"}
            >
              series
            </NavLink>
            <NavLink href="/library" active={pathname === "/library"}>
              library
            </NavLink>
          </div>

          {/* display search icon, and prfile menu */}
          <div className="ml-auto flex items-center justify-center gap-x-6 text-white md:m-0 lg:gap-x-8">
            {/* Search Icon */}
            <SearchBar onDarkenBackground={toggleNavBarBgColor} />

            {/* Profile Menu */}
            {status === "loading" ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-400" />
            ) : (
              <ProfileMenu
                userData={session?.user as UserProfileData}
                onSignOut={handleSignOut}
                callbackUrl={callbackUrl}
              />
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

export default Navbar;
