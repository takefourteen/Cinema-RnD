"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { CgSpinner } from "react-icons/cg";
import { fetchSearchResults } from "../../../lib/actions";
import MediaCard from "@/components/MediaCard";
import NoResultsMessage from "./NoResultsMessage";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  return (
    <>
      <div className="grid grid-cols-2 gap-x-2 gap-y-12 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-16 xl:grid-cols-5">
        {searchResults.map((media) => (
          <MediaCard
            key={media.id}
            data={media}
            aspect_ratio="2:3"
            loaderType="spinner"
          />
        ))}
      </div>
      {/* loading spinner */}
      {showSpinner && (
        <div
          ref={ref}
          className="col-span-full mt-8 flex items-end justify-center "
        >
          <LoadingSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* no results message */}
      {!showSpinner && !searchResults.length && (
        <NoResultsMessage searchTerm={searchParams.term} />
      )}
    </>
  );
};

export default InfiniteScrollSearchResults;
