"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdOutlineClose } from "react-icons/md";
import { Input } from "@/components/ui/input";

interface NavbarSearchBarProps {
  onSearchClick: () => void;
}

const NavbarSearchBar = ({ onSearchClick }: NavbarSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  function onSubmit() {
    console.log("searchQuery", searchQuery);

    // if there is no search query, clear the search bar and return
    if (searchQuery.trim() === "") {
      setSearchQuery("");
      return;
    }

    // if there is a search query, redirect to search page
    if (searchQuery) {
      // Navigate to the search route with the search term as a query parameter
      router.push(`/search?term=${encodeURIComponent(searchQuery)}`);

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

  // Event listener to close the search bar when the user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        onSearchClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, onSearchClick]);

  // Event listener to close the search bar when the user presses the escape key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onSearchClick();
      }
    }

    // Bind the event listener
    document.addEventListener("keydown", handleEscKey);

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onSearchClick]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" relative w-full border-x-0 border-b-1 border-t-0 border-b-red-600  bg-red-600"
    >
      <Input
        ref={inputRef} // for the event listener to close the search bar when the user clicks outside of it
        type="text"
        autoFocus
        placeholder="Search for movies, TV shows, and more..."
        className="master-container h-16 w-full rounded-none border-none bg-transparent  px-2 py-0 text-xl font-semibold leading-[5] tracking-wide text-white placeholder:text-xl placeholder:text-white/70 focus-visible:outline-none  focus-visible:ring-0  md:text-2xl md:placeholder:text-2xl"
        value={searchQuery}
        onChange={handleSearch}
      />

      {searchQuery && (
        <MdOutlineClose
          className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 transform cursor-pointer rounded-full text-white md:h-6 md:w-6 "
          onClick={handleClear}
        />
      )}
    </form>
  );
};

export default NavbarSearchBar;
