"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/application-group/navbar/Navbar";
import Footer from "@/components/Footer";

import { BsArrowUpLeft } from "react-icons/bs";
import { BsArrowLeft as LeftArrow } from "react-icons/bs";

// bg-gradient-to-tr from-[#060212]  via-[rgba(6,2,18,8)] to-[#070739]

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <section
      className="flex h-screen w-full flex-col items-center justify-center gap-y-10  text-white/50"
      style={{
        background:
          "radial-gradient(75% 75% at 50% 50%,#000000 0%,#17003d 100%)",
      }}
    >
      <Navbar />
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <h1
          className="mb-2 bg-cover bg-clip-text bg-center text-[60px] font-bold leading-none text-transparent md:text-[100px] lg:text-[120px]"
          style={{
            backgroundImage: `url("/not-found-bg.jpg")`,
            objectFit: "fill",
          }}
        >
          We Lost You!
        </h1>
        <div className="text-center ">
          <h2 className="mt-4 text-xl font-bold uppercase text-white/80 md:text-2xl lg:text-3xl">
            404 - Page not found
          </h2>
          <p className="font-body-text my-4 w-[30rem] font-normal lg:w-[38rem]">
            Sorry, it seems you&apos;ve reached a dead end. The page you were
            searching for might have been moved, renamed, or temporarily
            vanished.
          </p>
        </div>
        {/* <Link
          href="/"
          className="flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-[#0035F0FF] px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#002be7ff] hover:bg-[#002be7ff] hover:text-white hover:outline-2"
        >
          <BsArrowUpLeft className="mr-2 h-4 w-4" /> Return Home
        </Link> */}

        <Button
          onClick={handleGoBack}
          className="group flex h-fit w-max items-center rounded-lg border-[#002be7ff] bg-[#0035F0FF] px-4 py-2 text-sm font-bold uppercase text-white outline outline-0 outline-[#002be7ff] hover:bg-[#002be7ff] hover:text-white hover:outline-2"
        >
          <LeftArrow className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:scale-110" />{" "}
          Go Back
        </Button>
      </section>

      <div
        className="
        absolute bottom-0 left-0 right-0
      "
      >
        <Footer />
      </div>
    </section>
  );
}
