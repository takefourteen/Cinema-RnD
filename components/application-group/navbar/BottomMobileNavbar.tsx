import React from "react";

import {
  HomeIcon,
  LibraryIcon,
  TvIcon,
  MovieIcon,
} from "@/components/ui/icons/Icons";

type Props = {};

const BottomMobileNavbar = (props: Props) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-[50px] w-full border-t border-gray-200  bg-white dark:border-gray-600 dark:bg-gray-700 lg:hidden">
      <div className=" flex h-full w-full justify-around font-semibold">
        {/* Home */}
        <button
          type="button"
          className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <HomeIcon filled={false} />
          <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
            Home
          </span>
        </button>

        {/* Movies */}
        <button
          type="button"
          className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <MovieIcon filled={false} />
          <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
            Movies
          </span>
        </button>

        {/* Tv Series */}
        <button
          type="button"
          className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <TvIcon filled={false} />
          <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
            Tv Series
          </span>
        </button>

        {/* Library */}
        <button
          type="button"
          className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          <LibraryIcon filled={false} />
          <span className="text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500">
            Library
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomMobileNavbar;
