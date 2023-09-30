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
import CustomButton from "@/components/CustomButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [scroll, setScroll] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState<boolean>(false);
  const [darkenBackground, setDarkenBackground] = useState<boolean>(false);
  const isSearchScreen = pathname === "/search";
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
  const otherScreensNavbarClasses = `fixed  transition-all top-0 left-0 right-0 z-[99999] ${
    scroll || searchBarOpen || darkenBackground ? "bg-black" : "bg-transparent"
  }`;

  const searchScreenNavbarClasses = `fixed transition-all top-0 left-0 right-0 z-[99999] bg-black/90`;

  return (
    <nav
      className={
        isSearchScreen ? searchScreenNavbarClasses : otherScreensNavbarClasses
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
              alt="Netflix Logo"
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
        <div className="hidden items-center  uppercase lg:flex">
          <NavLink href="#" active={pathname === "/movies"}>
            movies
          </NavLink>
          <NavLink href="#" active={pathname === "/tv-shows"}>
            tv shows
          </NavLink>
          <NavLink href="/discovery" active={pathname === "/discovery"}>
            discovery
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
              <CustomButton asChild variant="outline" onClick={signOutUser}>
                <Link href="/">Log Out</Link>
              </CustomButton>
            </>
          ) : (
            <>
              {/* Log in Button, using custom btn */}
              <CustomButton
                asChild
                variant="outline"
                additionalStyles="hidden lg:flex"
              >
                <Link href="/login">Log In</Link>
              </CustomButton>

              {/* Sign up Button, using custom btn */}
              <CustomButton asChild>
                <Link href="/sign-up">Sign Up</Link>
              </CustomButton>
            </>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
