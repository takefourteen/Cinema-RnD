"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdOutlineClose } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MovieSearchBar = () => {
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
      className="flex flex-col items-center justify-center gap-y-4"
    >
      <h3 className="mt-4 text-center text-base text-white  lg:text-lg">
        Ready to watch? Find Your Favorite Shows and Movies!
      </h3>

      <div className="flex w-full items-center justify-center gap-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Find movies, TV shows, and more..."
            className="h-12 w-[200px] rounded-lg bg-black/30  px-3 py-3 text-lg font-semibold tracking-wide text-white placeholder:text-lg placeholder:text-[#a3a3a3] md:w-[300px] lg:w-[400px] lg:text-2xl"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <MdOutlineClose
              className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer rounded-full text-white lg:h-6 lg:w-6 "
              onClick={handleClear}
            />
          )}
        </div>

        <Button
          type="submit"
          className={` h-12 min-w-max bg-[#e50914] text-base font-semibold text-white hover:bg-[#c11119] md:px-6 md:py-3 md:text-lg  lg:text-xl `}
        >
          Search <IoSearchOutline className="ml-2 h-5 w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </form>
  );
};

export default MovieSearchBar;
