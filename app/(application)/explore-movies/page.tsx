import { Suspense } from "react";

import { movieGenres } from "@/constants/movieGenres";
import { exploreMovies } from "@/lib/tmdb-api/explore-movies";

import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import FilteredAndSortedMediaList from "@/components/application-group/explore-route/FilteredAndSortedMediaList";

// import ComingSoon from "@/components/ui/ComingSoon"
import GenreSelect from "@/components/application-group/explore-route/GenreSelect";

const genres: { title: string; id: number }[] = [
  {
    title: "Action",
    id: movieGenres.action,
  },
  {
    title: "Adventure",
    id: movieGenres.adventure,
  },
  {
    title: "Animation",
    id: movieGenres.animation,
  },
  {
    title: "Comedy",
    id: movieGenres.comedy,
  },
  {
    title: "Crime",
    id: movieGenres.crime,
  },
  {
    title: "Documentary",
    id: movieGenres.documentary,
  },
  {
    title: "Drama",
    id: movieGenres.drama,
  },
  {
    title: "Family",
    id: movieGenres.family,
  },
  {
    title: "Fantasy",
    id: movieGenres.fantasy,
  },
  {
    title: "History",
    id: movieGenres.history,
  },
  {
    title: "Horror",
    id: movieGenres.horror,
  },
  {
    title: "Music",
    id: movieGenres.music,
  },
  {
    title: "Mystery",
    id: movieGenres.mystery,
  },
  {
    title: "Romance",
    id: movieGenres.romance,
  },
  {
    title: "Sci-Fi",
    id: movieGenres.sciFi,
  },
  {
    title: "TV Movie",
    id: movieGenres.tvMovie,
  },
  {
    title: "Thriller",
    id: movieGenres.thriller,
  },
  {
    title: "War",
    id: movieGenres.war,
  },
  {
    title: "Western",
    id: movieGenres.western,
  },
];

type Props = {
  searchParams: {
    genres?: string | undefined;
    page?: string | undefined;
  };
};

const page = async ({ searchParams }: Props) => {
  const urlGenres = searchParams.genres?.split("~") as string[] | null;
  const urlPage = searchParams.page ? parseInt(searchParams.page) : 1;

  // convert the string array to number array, where the genres match their given id
  let urlGenresAsIds: number[] | null = null;

  if (urlGenres && urlGenres.length > 0) {
    urlGenresAsIds = urlGenres
      .map((genre) => {
        return genres.find((genreObj) => genreObj.title === genre)?.id;
      })
      .filter(Boolean) as number[];
  }

  const movies: DiscoverMovieApiResponse = await exploreMovies(
    urlGenresAsIds,
    urlPage,
    "popularity.desc",
  );

  return (
    <section className="master-container pt-10 relative mt-[72px] flex w-full flex-1 flex-col lg:mt-[92px]">
      <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row md:items-center md:gap-x-12">
        <h1 className="text-3xl font-bold md:text-4xl">Movies</h1>
        <Suspense fallback={null}>
          <GenreSelect genres={genres} urlGenres={urlGenres} />
        </Suspense>
      </div>

      {/* Display all the filtered and sorted content */}

      <FilteredAndSortedMediaList movies={movies} />
    </section>
  );
};
export default page;
