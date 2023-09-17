"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { CgSpinner } from "react-icons/cg";
import { fetchSearchResults } from "../../../lib/actions";
import MediaCard from "@/components/MediaCard";

interface InfiniteScrollSearchResultsProps {
  searchParams: { [key: string]: string };
}

const InfiniteScrollSearchResults = ({
  searchParams,
}: InfiniteScrollSearchResultsProps) => {
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<
    (MovieSearchResult | TvShowSearchResult)[]
  >([]);
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    const newPage = page + 1;
    const newResults = await fetchSearchResults(
      searchParams.term || "game of thrones",
      newPage,
    );

    if (newResults?.length) {
      setPage(newPage);
      setSearchResults([...searchResults, ...newResults]);
    }
  }, [searchParams, page, searchResults]);

  useEffect(() => {
    if (inView) {
      // load more after a delay
      const timeout = setTimeout(() => {
        loadMore();
      }, 500);
    }
  }, [inView, loadMore]);

  return (
    <>
      {searchResults.map((media) => (
        <MediaCard
          key={media.id}
          data={media}
          aspect_ratio="9:16"
          loaderType="spinner"
        />
      ))}

      {/* loading spinner */}
      <div
        ref={ref}
        className=" 
        col-span-3 flex items-center justify-center md:col-span-4 lg:col-span-5 lg:gap-y-16 xl:col-span-6
      "
      >
        <CgSpinner className="h-10 w-10 animate-spin text-gray-500" />
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

export default InfiniteScrollSearchResults;
