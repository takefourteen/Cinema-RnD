"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { HiMenuAlt4 as HamburgerMenuIcon } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

type MobileMenuProps = {
  onDarkenBackground: () => void;
};

const MobileMenu = ({ onDarkenBackground }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    onDarkenBackground(); // darken the background when the menu is open
  };

  // Event listener to close the menu when the user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onDarkenBackground(); // darken the background when the menu is open
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onDarkenBackground]);

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
      {/* Hamburger and Close Menu Btn */}
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

      {/* Menu */}
      {isOpen && (
        <>
          <ul className="absolute left-0 right-0 top-[80px] z-50 overflow-hidden bg-black/90 px-6  py-6 shadow-md transition-all md:right-auto md:top-[90px]">
            <li className=" px-10  hover:bg-[#40445999]">
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
            {/* separator line and then login that goes to /login */}
            <Separator className="mt-2 bg-white/40" />
            <li className="mt-2 px-10 hover:bg-[#40445999]">
              <NavLink href="/login">login</NavLink>
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
