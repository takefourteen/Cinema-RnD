import { FC, Suspense } from "react";

import { exploreMovies } from "@/lib/tmdb-api/explore-movies";

import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

type Props = {
  urlGenres: number[] | null;
};

const FilteredAndSortedMediaList: FC<Props> = async ({ urlGenres }) => {
  const movies: DiscoverMovieApiResponse = await exploreMovies(
    urlGenres,
    1,
    "popularity.desc",
  );

  console.log(urlGenres, "in FilterAndSortedMediaList.tsx");
  console.log("length of movies: ", movies?.results.length);
  console.log("total pages: ", movies.total_pages);

  return (
    <ul className="mt-8 grid grid-cols-3 gap-x-2 gap-y-12 md:grid-cols-4 md:gap-y-16 lg:grid-cols-5 xl:grid-cols-6">
      {movies?.results.map((media, index) => (
        <Suspense key={media.id} fallback={<CardSkeleton />}>
          <DataFetchingMediaCard
            mediaId={media.id.toString()}
            mediaType={"movie"}
            loaderType="skeleton"
            priority={index < 5 ? true : false}
            inAGrid={true}
          />
        </Suspense>
      ))}
    </ul>
  );
};

export default FilteredAndSortedMediaList;
