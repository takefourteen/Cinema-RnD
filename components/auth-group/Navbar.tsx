"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logo from "@/assets/images/netflix-logo.webp";
import smLogo from "@/assets/images/netflix-n-logo.webp";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <nav className=" relative flex h-[80px] w-full border-b border-gray-800">
      <div className="master-container z-10 flex w-full items-center justify-between px-8 py-2 lg:px-16">
        <div className="flex items-center">
          <Link href="/">
            {/* show lg logo on lg screens */}
            <Image
              src={logo}
              alt="Netflix Logo"
              width={150}
              priority
              className="hidden  sm:inline "
            />

            {/* show sm logo on sm screens */}
            <Image
              src={smLogo}
              alt="Netflix Logo"
              width={50}
              priority
              className="inline sm:hidden"
            />
          </Link>
        </div>

        {pathname === "/create-account" ? (
          <Button
            asChild
            variant="ghost"
            className="h-fit rounded-lg px-6 py-2 text-sm font-bold uppercase text-white hover:bg-[#40445999] hover:text-white"
          >
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <Button
            asChild
            className="h-fit w-max rounded-lg border-[#c11119] bg-[#e50914] px-6 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
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
