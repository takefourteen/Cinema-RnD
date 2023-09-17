"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

// import logo from "@/assets/images/netflix-logo.webp";
// import smLogo from "@/assets/images/netflix-n-logo.webp";
import logo from "@/assets/images/cozycinema-logo.webp";
import smLogo from "@/assets/images/cozycinema-logo-c.webp";
import MobileMenu from "../MobileMenu";
import NavbarSearchBar from "./NavbarSearchBar";
import RenderSearchIcon from "./RenderSearchIcon";
import NavLink from "./NavLink";
import CustomButton from "@/components/ui/CustomButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [scroll, setScroll] = useState(false);
  const [searchClicked, setsearchClicked] = useState<boolean>(false);
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
      <section className="master-container flex items-center justify-between px-4 py-2">
        {/* Mobile menu for sm screens */}
        <MobileMenu />

        {/* display logo */}
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

        {/* menu for lg screens */}
        <div className="hidden items-center  uppercase lg:flex">
          <NavLink href="#" active={pathname === "/movies"}>
            movies
          </NavLink>
          <NavLink href="#" active={pathname === "/tv-shows"}>
            tv shows
          </NavLink>
          <NavLink href="#" active={pathname === "/documentaries"}>
            documentaries
          </NavLink>
          <NavLink href="/my-library" active={pathname === "/my-library"}>
            my library
          </NavLink>
        </div>

        {/* display search icon, log in, and sign up buttons */}
        <div className="ml-auto flex items-center justify-center gap-x-4 text-white lg:m-0">
          {/* Search Icon */}
          <RenderSearchIcon
            scroll={scroll}
            isHomeScreen={isHomeScreen}
            handleSearchClick={handleSearchClick}
          />

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
              <CustomButton asChild variant="outline">
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

      {/* display Search bar below everything when search icon is clicked */}
      {searchClicked && <NavbarSearchBar onSearchClick={handleSearchClick} />}
    </nav>
  );
};

export default Navbar;
