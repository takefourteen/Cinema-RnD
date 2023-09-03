"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import logo from "@/assets/images/netflix-logo.png";
import { Button } from "@/components/ui/button";



const Navbar = () => {
  const { data: session, status } = useSession();
  const user = session?.user as UserData;
  const [scroll, setScroll] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (window.scrollY > 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  }

  // function to sign out the user
  async function signOutUser() {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  // define classes based on the scroll state. the navbar will remain fixed at the top of the page when the user scrolls down
  const navbarClasses = scroll ? "bg-black bg-opacity-90" : "";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center px-16 py-4 ${navbarClasses}`}
    >
      <div className="mr-4 flex items-center">
        <Link href="/">
          <Image src={logo} alt="Netflix Logo" width={125} priority />
        </Link>
      </div>

      <div className="flex  items-center uppercase">
        <NavLink href="#">movies</NavLink>
        <NavLink href="#">shows</NavLink>
        <NavLink href="#">documentaries</NavLink>
        <NavLink href="/my-list">my list</NavLink>
      </div>

      <div className="ml-auto flex items-center justify-center gap-x-4 text-white">
        {/* display log out if there is a user in session  */}
        {session?.user && (
          <React.Fragment>
            <Button
              onClick={signOutUser}
              variant="ghost"
              className="text- rounded-lg px-[25px] py-[10px] font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
            >
              Log Out
            </Button>
          </React.Fragment>
        )}

        {/* display create account and log in if there is no user in session  */}
        {!session?.user && (
          <React.Fragment>
            <Button
              asChild
              variant="ghost"
              className="text- rounded-lg px-[25px] py-[10px] font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="w-max rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-base font-bold uppercase text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
            >
              <Link href="/create-account">Create Account</Link>
            </Button>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

// component for displaying navbar links
type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className="h-fit rounded-lg px-[10px] py-[10px] text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
    >
      <Link href={`${href}`}>{children}</Link>
    </Button>
  );
};

export default Navbar;
