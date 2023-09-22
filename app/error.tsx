"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";
import { AiOutlineReload } from "react-icons/ai";
// import logo from "@/assets/images/netflix-logo.webp";
import logo from "@/assets/images/cozycinema-logo.webp";
import smLogo from "@/assets/images/cozycinema-logo-c.webp";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  console.log(error.message);
  return (
    <div className="master-container mx-auto flex h-screen flex-col items-center justify-center text-white  lg:max-w-[80%]">
      <Image src={logo} alt="Logo" width={200} className="mb-10" />

      <h1 className="mb-2 text-3xl font-bold md:text-4xl lg:text-5xl">
        Something Went Wrong
      </h1>
      <p className="mb-8 text-center text-lg md:text-xl">
        We&apos;re sorry, but an error occurred while processing your request.
      </p>

      {/* display error message */}
      <p className="mb-8 text-center text-base text-[#e50914] md:text-lg">
        {error.message}
      </p>

      {/* return home btn */}
      <Button
        asChild
        className="flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-[#0035F0FF] px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#454545] hover:bg-[#002be7ff] hover:text-white hover:outline-2"
      >
        <Link href="/">
          <BiArrowBack className="mr-2 h-4 w-4" /> Return Home
        </Link>
      </Button>

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
