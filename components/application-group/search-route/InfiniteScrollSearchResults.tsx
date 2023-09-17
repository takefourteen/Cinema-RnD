"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { CgSpinner } from "react-icons/cg";
import { fetchSearchResults } from "../../../lib/actions";
import MediaCard from "@/components/MediaCard";
import NoResultsMessage from "./NoResultsMessage";

interface InfiniteScrollSearchResultsProps {
  searchParams: { [key: string]: string };
}

const InfiniteScrollSearchResults = ({
  searchParams,
}: InfiniteScrollSearchResultsProps) => {
  // state to show spinner when loading more results
  const [showSpinner, setShowSpinner] = useState(true);
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<
    (MovieSearchResult | TvShowSearchResult)[]
  >([]);
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    let newPage = page;
    const newResults = await fetchSearchResults(
      searchParams.term || "game of thrones",
      newPage,
    );

    newPage += 1;

    if (newResults?.length) {
      setPage(newPage);
      setSearchResults([...(searchResults as any), ...newResults]);
    } else {
      setShowSpinner(false); // hide spinner when there are no more results
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

  console.log("searchResults", searchResults.length);

  return searchResults ? (
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
      {showSpinner && (
        <div
          ref={ref}
          className=" 
      col-span-3 flex items-center justify-center md:col-span-4 lg:col-span-5 lg:gap-y-16 xl:col-span-6
    "
        >
          <CgSpinner className="h-10 w-10 animate-spin text-gray-500" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  ) : (
    <NoResultsMessage searchTerm={searchParams.term} />
  );
};

export default InfiniteScrollSearchResults;
