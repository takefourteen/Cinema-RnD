import { FC, Suspense } from "react";

import { exploreMovies } from "@/lib/tmdb-api/explore-movies";

import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import Pagination from "./Pagination";

type Props = {
  urlGenres: number[] | null;
  page: number;
};

const FilteredAndSortedMediaList: FC<Props> = async ({ urlGenres, page }) => {
  const movies: DiscoverMovieApiResponse = await exploreMovies(
    urlGenres,
    page,
    "popularity.desc",
  );

  // console.log(urlGenres, "in FilterAndSortedMediaList.tsx");
  // console.log("length of movies: ", movies?.results.length);
  // console.log("total pages: ", movies.total_pages);

  if (movies?.results.length === 0) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center">
        <p className="text-2xl font-bold">No movies found</p>
        
      </div>
    );
  }

  return (
    <>
      <ul className="mt-8 grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
        {movies?.results.map((media, index) => (
          <Suspense key={media.id} fallback={<CardSkeleton />}>
            <DataFetchingMediaCard
              mediaId={media.id.toString()}
              mediaType={"movie"}
              loaderType="skeleton"
              priority={index <= 5 ? true : false}
              inAGrid={true}
            />
          </Suspense>
        ))}
      </ul>
      {/* Pagination component if movvies.results is not empty*/}
      {movies?.results.length > 0 && (
        <Pagination totalPages={movies.total_pages - 1} />
      )}
    </>
  );
};

export default FilteredAndSortedMediaList;
