"use client";

import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import smLogo from "@/assets/images/logos/cozycinema-logo-c.webp";
import { DetailsButton } from "@/components/DetailsButton";


type Props = {};

const Navbar = (props: Props) => {

  return (
    <nav className=" relative flex w-full py-2 bg-gradient-to-b from-black via-black/50 to-transparent ">
      <div className="master-container z-10 flex w-full items-center justify-center px-8 py-2 lg:px-16">
        <div className="flex items-center">
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
              className="inline sm:hidden"
            /> */}
          </Link>
        </div>       
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/0" />
    </nav>
  );
};

export default Navbar;
