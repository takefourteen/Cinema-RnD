"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import smLogo from "@/assets/images/logos/cozycinema-logo-c.webp";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import NavLink from "./NavLink";
import { DetailsButton } from "@/components/DetailsButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [scroll, setScroll] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [darkenBackground, setDarkenBackground] = useState<boolean>(false);
  const isScreenWithoutNavbarScrollEffect = ["search", "watch-movie"].includes(
    pathname.split("/")[1],
  );
  const scrollThreshold = 100; // Adjust this threshold as needed

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

  function handleDarkenBackground() {
    setDarkenBackground((prev) => !prev);
  }

  // function to sign out the user
  async function signOutUser() {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  }

  /*
    Define classes based on the scroll state, whether the search icon is clicked, and 
    is darkenBackground is true or false
  */
  const otherScreensNavbarClasses = `fixed transition-colors top-0 left-0 right-0 z-[99999] ${
    scroll || searchBarOpen || darkenBackground
      ? "bg-black"
      : "bg-gradient-to-b from-black via-black/50 to-transparent"
  }`;

  const screenWithoutNavbarScrollEffectClasses = `fixed transition-colors top-0 left-0 right-0 z-[99999] bg-black/90`;

  return (
    <nav
      className={
        isScreenWithoutNavbarScrollEffect
          ? screenWithoutNavbarScrollEffectClasses
          : otherScreensNavbarClasses
      }
    >
      <section className="master-container  flex items-center justify-between px-4 py-2">
        {/* Mobile menu for sm screens */}
        <MobileMenu onDarkenBackground={handleDarkenBackground} />

        {/* display logo */}
        <div className="mr-4 flex items-center">
          <Link href="/">
            {/* show lg logo on lg screens */}
            <Image
              src={logo}
              alt="Cozy Cinema Logo"
              width={125}
              priority
              className="w-[100px] lg:w-[125px] "
            />

            {/* show sm logo on sm screens */}
            {/* <Image
              src={smLogo}
              alt="Netflix Logo"
              width={50}
              priority
              className="inline md:hidden"
            /> */}
          </Link>
        </div>

        {/* menu for lg screens */}
        <div className="hidden items-center gap-x-2  uppercase lg:flex">
          <NavLink href="/" active={pathname === "/discovery"}>
            Home
          </NavLink>
          <NavLink href="#" active={pathname === "/movies"}>
            movies
          </NavLink>
          <NavLink href="#" active={pathname === "/tv-shows"}>
            tv shows
          </NavLink>
          <NavLink href="/categories" active={pathname === "/categories"}>
            categories
          </NavLink>
          <NavLink href="/my-library" active={pathname === "/my-library"}>
            my library
          </NavLink>
        </div>

        {/* display search icon, log in, and sign up buttons */}
        <div className="ml-auto flex items-center justify-center gap-x-4 text-white lg:m-0">
          {/* Search Icon */}
          <SearchBar onDarkenBackground={handleDarkenBackground} />

          {/* display log out if there is a user in session  */}
          {session?.user ? (
            <>
              {/* Log out Button, using custom btn */}
              <DetailsButton
                variant="outline"
                size={"rounded"}
                className="hidden w-max text-sm font-bold uppercase lg:flex"
                asChild
                onClick={signOutUser}
              >
                <Link href="/">Log Out</Link>
              </DetailsButton>
            </>
          ) : (
            <>
              {/* Log in Button, using custom btn */}

              <DetailsButton
                variant="outline"
                size={"rounded"}
                className="hidden w-max text-sm font-bold uppercase lg:flex"
                asChild
              >
                <Link href="/login">Log In</Link>
              </DetailsButton>

              <DetailsButton
                variant={"primary"}
                size={"rounded"}
                className="w-max text-sm font-bold uppercase"
                asChild
              >
                <Link href="/sign-up">Sign Up</Link>
              </DetailsButton>
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
