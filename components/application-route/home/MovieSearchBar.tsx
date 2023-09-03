"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { MdOutlineClose } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoChevronForwardSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MovieSearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    console.log(searchQuery);
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
      <h3 className="text-center text-lg  text-white">
        Ready to watch? Find Your Favorite Shows and Movies!
      </h3>

      <div className="flex w-full items-center justify-center gap-x-4">
        <div className="relative">
            <Input
              type="text"
              placeholder="Find movies, TV shows, and more..."
              className="h-12 rounded-lg bg-black/30 px-6 py-3 text-2xl font-semibold text-white placeholder:text-[#a3a3a3] placeholder:text-lg"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <MdOutlineClose
                className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer rounded-full text-white "
                onClick={handleClear}
              />
            )}
        </div>

        <Button
          type="submit"
          className={` h-12 min-w-max bg-[#e50914] px-6 py-3 text-xl font-semibold text-white  hover:bg-[#c11119] `}
        >
          Search <IoSearchOutline className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </form>
  );
};

export default MovieSearchBar;
