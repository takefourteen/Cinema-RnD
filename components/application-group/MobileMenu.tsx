"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { HiMenuAlt4 as HamburgerMenuIcon } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Event listener to close the menu when the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Event listener to close the menu when the user presses the escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    // cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden" ref={menuRef}>
      <button
        className={`mr-4 block rounded-full text-white transition-colors hover:bg-white/10`}
        onClick={toggleMenu}
      >
        <div
          className={` transform p-2 transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? (
            <IoMdClose className={`h-8 w-8`} />
          ) : (
            <HamburgerMenuIcon className={`h-8 w-8 fill-[#e50914ff]`} />
          )}
        </div>
      </button>
      {isOpen && (
        <>
          <ul className="absolute left-0 top-[100px] z-50 overflow-hidden  bg-black/80 p-4 shadow-md transition-all">
            <li className="mt-4 px-10  hover:bg-[#40445999]">
              <NavLink href="#">movies</NavLink>
            </li>
            <li className="mt-4 px-10 hover:bg-[#40445999]">
              <NavLink href="#">shows</NavLink>
            </li>
            <li className="mt-4 px-10 hover:bg-[#40445999]">
              <NavLink href="#">documentaries</NavLink>
            </li>
            <li className="mt-4 px-10 hover:bg-[#40445999]">
              <NavLink href="/my-library">my library</NavLink>
            </li>
          </ul>

          {/*dark overlay on menu open */}
          {/* <div className="absolute inset-0 min-h-screen bg-black/20"></div> */}
        </>
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
      className="flex h-fit w-full justify-start rounded-lg px-[10px] py-[10px] text-sm font-bold uppercase text-white hover:bg-transparent hover:text-white"
    >
      <Link href={`${href}`}>{children}</Link>
    </Button>
  );
};

export default MobileMenu;
