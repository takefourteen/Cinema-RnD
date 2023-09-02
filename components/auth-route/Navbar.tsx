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
    <nav className="relative w-full flex h-[80px]">
    <div className="flex w-full z-10 justify-between px-16 py-2 items-center">
      <div className="flex items-center">
        <Link href="/">
          <Image src={logo} alt="Netflix Logo" width={150} priority />
        </Link>
      </div>
  
      {pathname === "/create-account" ? (
        <Button
          asChild
          variant="ghost"
          className="rounded-lg px-[24px] py-[10px] text-sm font-bold uppercase tracking-wider text-white hover:bg-[#40445999] hover:text-white"
        >
          <Link href="/login">Log In</Link>
        </Button>
      ) : (
        <Button
          asChild
          className="rounded-lg border-[#c11119] bg-[#e50914] px-[25px] py-[10px] text-sm font-bold uppercase tracking-wider text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
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
