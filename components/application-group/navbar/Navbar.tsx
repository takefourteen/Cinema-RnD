"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import logo from "@/assets/images/netflix-logo.webp";
import smLogo from "@/assets/images/netflix-n-logo.webp";
import MobileMenu from "../MobileMenu";
import NavbarSearchBar from "./NavbarSearchBar";
import RenderSearchIcon from "./RenderSearchIcon";
import NavLink from "./NavLink";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [scroll, setScroll] = useState(false);
  const [searchClicked, setsearchClicked] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomeScreen = pathname === "/";
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

  function handleSearchClick() {
    setsearchClicked((prev) => !prev);
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

  // Define classes based on the scroll state and isHomeScreen
  const homeScreenNavbarClasses = `fixed   top-0 left-0 right-0 z-[99999] transition-all duration-300 ease-in-out ${
    scroll ? "bg-black" : "bg-transparent"
  }`;

  const otherScreenNavbarClasses = `fixed  top-0 left-0 right-0 z-[99999] transition-all duration-300 ease-in-out bg-black/90`;

  return (
    <nav
      className={
        isHomeScreen ? homeScreenNavbarClasses : otherScreenNavbarClasses
      }
    >
      <section className="master-container flex items-center justify-between px-4 py-4">
        {/* Mobile menu for sm screens */}
        <MobileMenu />

        <div className="mr-4 flex items-center">
          <Link href="/">
            {/* show lg logo on lg screens */}
            <Image
              src={logo}
              alt="Netflix Logo"
              width={125}
              priority
              className="hidden md:inline"
            />

            {/* show sm logo on sm screens */}
            <Image
              src={smLogo}
              alt="Netflix Logo"
              width={50}
              priority
              className="inline md:hidden"
            />
          </Link>
        </div>

        {/* navlinks for lg screens */}
        <div className="hidden items-center  uppercase lg:flex">
          <NavLink href="#">movies</NavLink>
          <NavLink href="#">tv shows</NavLink>
          <NavLink href="#">documentaries</NavLink>
          <NavLink href="/my-library">my library</NavLink>
        </div>

        {/* display search icon and cta buttos */}
        <div className="ml-auto flex items-center justify-center gap-x-4 text-white">
          {/* Search Icon */}
          <RenderSearchIcon
            scroll={scroll}
            isHomeScreen={isHomeScreen}
            handleSearchClick={handleSearchClick}
          />

          {/* display log out if there is a user in session  */}
          {session?.user ? (
            <React.Fragment>
              <Button
                onClick={signOutUser}
                variant="ghost"
                className="h-fit rounded-lg px-6 py-2 text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
              >
                Log Out
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Button
                asChild
                variant="ghost"
                className="h-fit rounded-lg px-6 py-2 text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="h-fit w-max rounded-lg border-[#c11119] bg-[#e50914] px-6 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
              >
                <Link href="/create-account">Create Account</Link>
              </Button>
            </React.Fragment>
          )}
        </div>
      </section>

      {/* display Search bar below everything when search icon is clicked */}
      {searchClicked && !isHomeScreen && (
        <NavbarSearchBar onSearchClick={handleSearchClick} />
      )}
    </nav>
  );
};

export default Navbar;
