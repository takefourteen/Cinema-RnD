"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { signOutUser } from "@/lib/auth-api/sign-out";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import smLogo from "@/assets/images/logos/cozycinema-logo-c.webp";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import NavLink from "./NavLink";
import { DetailsButton } from "@/components/DetailsButton";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: session, status } = useSession();
  const [scroll, setScroll] = useState(false);
  const [darkenBackground, setDarkenBackground] = useState<boolean>(false);
  const isScreenWithoutNavbarScrollEffect = [
    "search",
    "watch-movie",
    "watch-tv",
  ].includes(pathname.split("/")[1]);
  const scrollThreshold = 90; // Adjust this threshold as needed

  const [currentUrl, setCurrentUrl] = useState<string>("/");

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    setCurrentUrl(url);
  }, [pathname, searchParams]);

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

  const handleSignOut = async () => {
    await signOutUser();
    router.push("/");
  };

  /*
    Define classes based on the scroll state, whether the search icon is clicked, and 
    is darkenBackground is true or false
  */
  const otherScreensNavbarClasses = `fixed transition-colors top-0 left-0 right-0 z-[99999] ${
    scroll || darkenBackground
      ? "bg-black"
      : "bg-gradient-to-b from-black via-black/50 to-transparent"
  }`;

  const screenWithoutNavbarScrollEffectClasses = `fixed transition-colors top-0 left-0 right-0 z-[99999] bg-black/90`;

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
          {/* Mobile menu for sm screens */}
          <MobileMenu
            onDarkenBackground={handleDarkenBackground}
            showLogOutBtn={session?.user ? true : false}
            logOutBtn={
              <LogOutBtn signOutUser={handleSignOut} isMobileMenu={true} />
            }
            logInBtn={<LogInBtn isMobileMenu={true} callbackUrl={currentUrl} />}
          />

          {/* display logo */}
          <div className="mr-4 flex items-center">
            <Link href="/">
              {/* show lg logo on lg screens */}
              <Image
                src={logo}
                alt="Cozy Cinema Logo"
                width={125}
                priority
                sizes="(max-width: 640px) 80px, (max-width: 1024px) 100px, 125px"
                className="max-w-[80px] sm:max-w-[100px] lg:max-w-[125px] "
              />
            </Link>
          </div>

          {/* menu for lg screens */}
          <div className="hidden items-center gap-x-2  uppercase lg:flex">
            <NavLink href="/" active={pathname === "/"}>
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
                <LogOutBtn signOutUser={handleSignOut} isMobileMenu={false} />
              </>
            ) : (
              <>
                {/* Log in Button, using custom btn */}

                <LogInBtn isMobileMenu={false} callbackUrl={currentUrl} />

                <DetailsButton
                  variant={"primary"}
                  size={"rounded"}
                  className="w-max text-xs font-bold uppercase sm:text-sm"
                  asChild
                >
                  <Link
                    href={`/sign-up?callbackUrl=${encodeURIComponent(
                      currentUrl,
                    )}`}
                  >
                    Sign Up
                  </Link>
                </DetailsButton>
              </>
            )}
          </div>
        </section>
      </nav>
    </>
  );
};

type LogOutBtnProps = {
  signOutUser(): Promise<void>;
  isMobileMenu: boolean;
};

const LogOutBtn = ({ signOutUser, isMobileMenu }: LogOutBtnProps) => {
  const mobileMenuClasses =
    "flex h-fit w-full justify-start rounded-lg px-[10px] border-none py-[10px] text-sm font-bold uppercase text-white hover:bg-transparent hover:text-white";
  const navbarClasses = "hidden lg:flex w-max text-sm font-bold uppercase";

  return (
    <DetailsButton
      variant={"outline"}
      size={"rounded"}
      className={isMobileMenu ? mobileMenuClasses : navbarClasses}
      onClick={signOutUser}
    >
      Log Out
    </DetailsButton>
  );
};

type LogInBtnProps = {
  isMobileMenu: boolean;
  callbackUrl: string;
};

const LogInBtn = ({ isMobileMenu, callbackUrl }: LogInBtnProps) => {
  const mobileMenuClasses =
    "flex h-fit w-full justify-start rounded-lg px-[10px] border-none py-[10px] text-sm font-bold uppercase text-white hover:bg-transparent hover:text-white";
  const navbarClasses = "hidden lg:flex w-max text-sm font-bold uppercase";

  return (
    <DetailsButton
      asChild
      variant={"outline"}
      size={"rounded"}
      className={isMobileMenu ? mobileMenuClasses : navbarClasses}
    >
      <Link href={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
        Log In
      </Link>
    </DetailsButton>
  );
};

export default Navbar;
