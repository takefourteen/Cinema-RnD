"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { fetchSearchResults } from "@/lib/actions";
import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import NoResultsMessage from "./NoResultsMessage";
import LoadingSpinner from "@/components/skeletons/LoadingSpinner";

interface InfiniteScrollSearchResultsProps {
  searchTerm: string;
}

const InfiniteScrollSearchResults = ({
  searchTerm,
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
      searchTerm || "game of thrones",
      newPage,
    );

    newPage += 1;

    if (newResults?.length) {
      setPage(newPage);
      setSearchResults([...(searchResults as any), ...newResults]);
    } else {
      setShowSpinner(false); // hide spinner when there are no more results
    }
  }, [searchTerm, page, searchResults]);

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
        {searchResults.map((media, index) => (
          <DataFetchingMediaCard
            key={media.id}
            mediaId={media.id.toString()}
            mediaType={
              (media as TvShowSearchResult).original_name ? "tv" : "movie"
            }
            loaderType="spinner"
            priority={
              index < 5
                ? true
                : false /* only set priority to true for first 5 results */
            }
            inAGrid={true}
          />
        ))}
      </div>
      {/* loading spinner */}
      {showSpinner && (
        <div
          ref={ref}
          className="relative col-span-full mt-8 flex items-end justify-center "
        >
          <LoadingSpinner />
          <span className="sr-only">Loading...</span>
        </div>
      )}

      {/* no results message */}
      {!showSpinner &&
        (!searchResults.length || searchResults.length === 0) && (
          <NoResultsMessage searchTerm={searchTerm} />
        )}
    </>
  );
};

export default InfiniteScrollSearchResults;
