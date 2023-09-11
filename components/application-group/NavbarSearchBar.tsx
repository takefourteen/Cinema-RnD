"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdOutlineClose } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Input as NextInput } from "@nextui-org/react";
import { Button } from "@/components/ui/button";

interface NavbarSearchBarProps {
  onSearchClick: () => void;
}

const NavbarSearchBar = ({ onSearchClick }: NavbarSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  function onSubmit() {
    console.log("searchQuery", searchQuery);

    // if there is a search query, redirect to search page
    if (searchQuery) {
      // Navigate to the search route with the search term as a query parameter
      router.push(`/search?term=${encodeURIComponent(searchQuery)}&page=1`);

      // close the search bar
      onSearchClick();
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }
  function handleClear() {
    // Clear search query if there is one
    if (searchQuery) {
      setSearchQuery("");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="master-container relative mt-4 w-full"
    >
      {/* <div className="flex w-full items-center justify-center gap-x-4"> */}

      <Input
        type="text"
        autoFocus
        placeholder="Find movies, TV shows, and more..."
        className="h-14 w-full rounded-none border-x-0 border-b-1 border-t-0 border-b-red-600 bg-black/30 px-3  py-2 text-xl font-semibold leading-[1.5] tracking-wide text-white placeholder:text-lg placeholder:text-[rgba(163,163,163,0.70)]  focus-visible:outline-none focus-visible:ring-0 lg:text-2xl"
        value={searchQuery}
        onChange={handleSearch}
      />

      {searchQuery && (
        <MdOutlineClose
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer rounded-full text-white lg:h-6 lg:w-6 "
          onClick={handleClear}
        />
      )}

      {/* <Button
          type="submit"
          className={` h-12 min-w-max bg-[#e50914] text-base font-semibold text-white hover:bg-[#c11119] md:px-6 md:py-3 md:text-lg  lg:text-xl `}
        >
          Search <IoSearchOutline className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
        </Button> */}
      {/* </div> */}
    </form>
  );
};

export default NavbarSearchBar;
