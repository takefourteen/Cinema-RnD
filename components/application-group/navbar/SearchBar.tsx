"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

import { MdOutlineClose as CloseIcon } from "react-icons/md";
import { SearchIcon } from "@/components/ui/icons/Icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NavbarSearchBarProps {
  onDarkenBackground: () => void;
}

const SearchBar = ({ onDarkenBackground }: NavbarSearchBarProps) => {
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState<boolean>(false);
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

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search") as string;

    // if there is no search query, return
    if (searchQuery.trim() === "") {
      return;
    }

    console.log(searchQuery);

    // if there is a search query, redirect to search page
    if (searchQuery) {
      // clear the search query
      setSearchQuery("");

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

  // function to clear the search query
  function clearSearchQuery() {
    setSearchQuery("");
  }

  return (
    <div ref={searchContainerRef}>
      {/* search icon to toggle the input field */}
      <Button
        variant="outline"
        size={"icon"}
        className="flex items-center justify-center  rounded-full border-none bg-[#2c2c2c] font-bold ring-1 ring-primaryRed ring-offset-1 ring-offset-primaryRed hover:bg-[#2b2b2bbb] hover:text-white/80 lg:h-12 lg:w-12"
        onClick={toggleSearchBar}
        aria-label="Open search bar"
      >
        {/* <SearchIcon className="h-4 w-4 sm:h-5 sm:w-5" /> */}
        <SearchIcon className="h-6 w-6 -rotate-3 lg:h-7 lg:w-7" />
      </Button>

      {/* search bar input*/}
      {isSearchBarOpen && (
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className=" absolute left-0 right-0 top-[75px] z-50 w-full overflow-hidden bg-[#ffffff] transition-all  lg:top-[90px]"
        >
          <div className="master-container relative h-full">
            <Input
              type="text"
              name="search"
              autoFocus
              placeholder="Search for Movies and TV shows"
              className=" h-12 w-full rounded-none border-none bg-transparent px-2  py-0 text-2xl font-semibold tracking-wide text-[#333] placeholder:pl-[1px] placeholder:text-lg placeholder:text-[#999] focus-visible:outline-none focus-visible:ring-0  md:text-2xl  md:placeholder:text-xl lg:h-14"
              value={searchQuery}
              onChange={handleSearch}
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size={"icon"}
                type="button"
                className="absolute right-4 top-1/2 flex -translate-y-1/2  transform items-center justify-center rounded-full text-2xl text-black hover:bg-[#333] hover:text-[#ffffff]"
                onClick={clearSearchQuery}
                aria-label="Clear search query"
              >
                <CloseIcon className="h-6 w-6 md:h-8 md:w-8" />
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
