"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { MdOutlineClose as CloseIcon } from "react-icons/md";
import { FaMagnifyingGlass as SearchIcon } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarSearchBarProps {
  onDarkenBackground: () => void;
}

const SearchBar = ({ onDarkenBackground }: NavbarSearchBarProps) => {
  const searchContainerRef = useRef<HTMLFormElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // function that opens and closes the searchbar when the searh icon is clicked
  // Define toggleSearchBar as a memoized callback
  const toggleSearchBar = useCallback(() => {
    setIsSearchBarOpen((prev) => !prev);
    onDarkenBackground(); // darken the background when the search bar is open
  }, [setIsSearchBarOpen, onDarkenBackground]);

  // function to close the search bar when the user clicks outside of the search bar
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchBarOpen(false);
        onDarkenBackground(); // darken the background when the search bar is open
      }
    },
    [setIsSearchBarOpen, onDarkenBackground],
  );

  // Close the search bar when the user clicks outside of the search bar
  useEffect(() => {
    if (isSearchBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchBarOpen, handleClickOutside]);

  // Close the search bar when the user clicks the escape key
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        toggleSearchBar();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [toggleSearchBar]);

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
      toggleSearchBar();
    }
  }

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1), // capitalize the first letter
    );
  }

  function handleClear() {
    // Clear search query if there is one
    if (searchQuery) {
      setSearchQuery("");
    }
  }

  return (
    <>
      {/* search icon to toggle the input field */}
      <Button
        variant="ghost"
        size={"icon"}
        className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-[#40445999] hover:text-white"
        onClick={toggleSearchBar}
        aria-label="Open search bar"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>

      {/* search bar input*/}
      {isSearchBarOpen && (
        <form
          ref={searchContainerRef}
          onSubmit={handleSubmit(onSubmit)}
          className=" absolute left-0 right-0 top-[78px] z-50 w-full overflow-hidden bg-[#ffffff] transition-all  lg:top-[90px]"
        >
          <div className="master-container relative h-full">
            <Input
              type="text"
              autoFocus
              placeholder="Search for Movies and TV shows"
              className=" h-12 w-full rounded-none border-none bg-transparent px-2  py-0 text-2xl font-semibold tracking-wide text-[#333] placeholder:pl-[1px] placeholder:text-2xl placeholder:text-[#999] focus-visible:outline-none focus-visible:ring-0  md:text-2xl  md:placeholder:text-2xl lg:h-14"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size={"icon"}
                className="absolute right-4 top-1/2 flex -translate-y-1/2  transform items-center justify-center rounded-full text-2xl text-black hover:bg-[#333] hover:text-[#ffffff]"
                onClick={handleClear}
                aria-label="Clear search query"
              >
                <CloseIcon className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default SearchBar;
