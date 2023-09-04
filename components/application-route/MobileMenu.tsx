"use client";

import Link from "next/link";
import { useState } from "react";

import { HiMenuAlt4 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <button
        className={`mr-4 block rounded-full text-white transition-colors hover:bg-white/10`}
        onClick={toggleMenu}
      >
        <div
          className={`h-10 w-10 transform p-2 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? (
            <IoMdClose className={`h-full w-full`} />
          ) : (
            <HiMenuAlt4 className={`h-full w-full`} />
          )}
        </div>
      </button>
      {isOpen && (
        // <div className="">
        <ul className="absolute left-0 top-[60px] z-50 overflow-hidden  bg-black/70 p-4 shadow-md transition-all">
          <li className="mt-4  px-10">
            <NavLink href="#">movies</NavLink>
          </li>
          <li className="mt-4 px-10">
            <NavLink href="#">shows</NavLink>
          </li>
          <li className="mt-4 px-10">
            <NavLink href="#">documentaries</NavLink>
          </li>
          <li className="mt-4 px-10">
            <NavLink href="/my-list">my list</NavLink>
          </li>
        </ul>
        // </div>
      )}
    </div>
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

export default MobileMenu;
