"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/images/netflix-logo.png";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className="relative flex h-[80px] w-full">
      <div className="z-10 flex w-full items-center justify-between px-8 py-2 lg:px-16">
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Netflix Logo"
              width={150}
              priority
              className="w-[100px] lg:w-[150px]"
            />
          </Link>
        </div>

        {pathname === "/create-account" ? (
          <Button
            asChild
            variant="ghost"
            className="w-max rounded-lg bg-none px-4 py-1 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#40445999] hover:text-white lg:px-6 lg:py-2 lg:text-sm"
          >
            <Link href="/login" className="">
              Log In
            </Link>
          </Button>
        ) : (
          <Button
            asChild
            className="w-max rounded-lg border-[#c11119] bg-[#e50914] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2 lg:px-6 lg:py-2 lg:text-sm"
          >
            <Link href="/create-account">Create Account</Link>
          </Button>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/0" />
    </nav>
  );
};

export default Navbar;
