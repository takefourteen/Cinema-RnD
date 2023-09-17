import React from "react";
import { FaSadCry } from "react-icons/fa";

interface NoResultsMessageProps {
  searchTerm: string;
}

const NoResultsMessage = ({ searchTerm }: NoResultsMessageProps) => {
  return (
    <div className="col-span-3 mt-16 flex flex-col items-center justify-center gap-y-4 text-center md:col-span-4 lg:col-span-5  xl:col-span-6">
      {/* <FaSadCry className="mb-4 text-5xl text-gray-500" /> */}
      <p className="text-3xl font-semibold lg:text-4xl">Hmmm...</p>
      <p className="text-2xl lg:text-3xl ">
        we couldn&apos;t find any results for{" "}
        <span className="text-red-600">&quot;{searchTerm}&quot;</span>
      </p>
      <p className="text-lg tracking-wide ">
        Please try a different search term.
      </p>
    </div>
  );
};

export default NoResultsMessage;
