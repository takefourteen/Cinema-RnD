"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
// import logo from "@/assets/images/netflix-logo.webp";
import { errorImages } from "@/constants/index"; // array of error images
import { Button } from "@/components/ui/button";

import logo from "@/assets/images/logos/cozycinema-logo.webp";
import smLogo from "@/assets/images/logos/cozycinema-logo-c.webp";

//   RANDOM NUMBER GENERATOR
function getRandomInt(max: number) {
  return Math.floor(Math.random() * (max + 1));
}

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  // random number between 0 and the size of the errorImages array
  const randomNum = getRandomInt(errorImages.length - 1);

  return (
    <div className="master-container mx-auto mt-[90px] flex h-[80dvh] flex-col items-center justify-center gap-x-12 px-4 text-white lg:mt-[100px]  lg:max-w-[80%] lg:flex-row ">
      <Image
        src={errorImages[randomNum]}
        alt="Logo"
        width={200}
        className="mb-10 lg:order-2 lg:col-span-1 lg:w-[250px] lg:justify-self-start"
      />

      <section className="flex flex-col items-center justify-center  ">
        <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
          Something Went Wrong
        </h1>
        <p className="mb-8 text-center text-lg md:text-xl">
          We&apos;re sorry, but an error occurred while processing your request.
        </p>
        {/* display error message */}
        <p className="mb-8 max-w-[34rem] text-center text-base text-[#e50914] md:text-lg lg:max-w-[38rem] lg:justify-self-start">
          {error.message}
        </p>
        {/* return home btn */}
        <Button
          asChild
          className="flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-[#0035F0FF] px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#454545] hover:bg-[#002be7ff] hover:text-white hover:outline-2"
        >
          <Link href="/">
            <BiArrowBack className="mr-2 h-4 w-4 rotate-45" /> Return Home
          </Link>
        </Button>
      </section>

      {/* refresh screen btn */}
      {/* <Button
        onClick={() => {
          router.refresh();
          reset();
        }}
        className="flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-[#0035F0FF] px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#454545] hover:bg-[#002be7ff] hover:text-white hover:outline-2"
      >
        <AiOutlineReload className="mr-2 h-4 w-4" /> Reload
      </Button> */}
    </div>
  );
}
