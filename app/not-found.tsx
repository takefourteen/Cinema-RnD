"use client";

import Image from "next/image";
import Link from "next/link";

import { BsArrowUpLeft } from "react-icons/bs";

import { DetailsButton } from "@/components/DetailsButton";
import Navbar from "@/components/application-group/navbar/Navbar";
import BottomMobileNavbar from "@/components/application-group/navbar/BottomMobileNavbar";
import Footer from "@/components/Footer";

import notFoundMonkey from "@/assets/images/error/not-found-monkey.png";

// bg-gradient-to-tr from-[#060212]  via-[rgba(6,2,18,8)] to-[#070739]

export default function NotFound() {
  return (
    <section
      role="main"
      aria-label="404 Not Found"
      className="flex h-screen w-full flex-col items-center justify-center gap-y-10  text-white/50"
      style={{
        background:
          "radial-gradient(75% 75% at 50% 50%,#000000 0%,#17003d 100%)",
      }}
    >
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <Image
          src={notFoundMonkey}
          alt="Image of a monkey holding a magnifying glass indicating a 404 error"
          className="object-contain"
        />

        <div className="w-full text-center ">
          <h2 className="mt-4 text-xl font-bold uppercase text-white/80 md:text-2xl lg:text-3xl">
            404 - Page not found
          </h2>
          <p className="font-body-text mb-4 font-normal ">
            Sorry, it seems you&apos;ve reached a dead end.
          </p>
        </div>

        <DetailsButton
          asChild
          variant={"tertiary"}
          size={"sm"}
          className="group gap-x-2 rounded-md text-sm font-bold uppercase"
        >
          <Link href="/">
            <BsArrowUpLeft
              className="text-base transition-transform group-hover:scale-110"
              aria-label="Return Home"
            />{" "}
            Return Home
          </Link>
        </DetailsButton>
      </section>

      <div
        className="
        absolute bottom-0 left-0 right-0
      "
      >
        <Footer />
      </div>

      <BottomMobileNavbar />
    </section>
  );
}
