"use client";

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

import { BiArrowBack } from "react-icons/bi";
import logo from "@/assets/images/netflix-logo.webp";

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
    <div className="flex h-screen flex-col items-center justify-center  text-white">
      {/* <img
      src="/your-logo.png" // Replace with your app's logo
      alt="Logo"
      className="mb-4 h-16"
    /> */}

      <Image
        src={logo}
        alt="Logo"
        width={200}
        height={100}
        className="mb-10 h-16"
      />

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

      <Button
        onClick={() => router.push("/")}
        className="h-fit w-max rounded-lg border-[#c11119] bg-[#e50914] px-6 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#c11119] hover:bg-[#c11119] hover:text-white hover:outline-2"
      >
        <BiArrowBack className="mr-2 h-4 w-4" /> Go Back to Home
      </Button>
    </div>
  );
}
