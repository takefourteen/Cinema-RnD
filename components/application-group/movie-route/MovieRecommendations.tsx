import React from "react";

import { fetchMovieRecommendations } from "@/lib/tmdb-api/recommendations";
import { fetchSimilarMovies } from "@/lib/tmdb-api/similar";
import { filterResultsByLanguage } from "@/lib/tmdb-api/search";

import Skeleton from "@/components/Skeleton";
import RecommendedMovieImage from "./RecommendedMovieImage";

type MovieRecommendationsProps = {
  movieId: string;
};

const MovieRecommendations = async ({ movieId }: MovieRecommendationsProps) => {
  const { data: similarMovies, error: similarMoviesError } =
    await fetchSimilarMovies(movieId);
  const { data: recommendedMovies, error: recommendedMoviesError } =
    await fetchMovieRecommendations(movieId);

  /*
    if there is an error fetching similarMovies and recommendedMovies, 
    throw an error that will be caught by the ErrorBoundary (error.tsx)
   */
  if (similarMoviesError && recommendedMoviesError) {
    throw new Error(
      `Error fetching similar movies and recommended movies: ${similarMoviesError} and ${recommendedMoviesError}`,
    );
  }

  // =========================================
  // Filter out movies that are not in english
  // =========================================
  const filteredSimilarMovies = filterResultsByLanguage(
    similarMovies || [],
    "en",
  );
  const filteredRecommendedMovies = filterResultsByLanguage(
    recommendedMovies || [],
    "en",
  );

  // If both similarMovies and recommendedMovies are undefined, return a loading state
  if (!similarMovies && !recommendedMovies) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={0} mainItemHeight={100} />
        ))}
      </div>
    );
  }

  // If recommendedMovies is undefined, return similarMovies
  if (!recommendedMovies) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {similarMovies
          ?.slice(0, 12)
          .map((movie) => <div key={movie.id}>{movie.original_title}</div>)}
      </div>
    );
  }

  // If similarMovies is undefined, return recommendedMovies
  if (!similarMovies) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {recommendedMovies
          ?.slice(0, 12)
          .map((movie) => <div key={movie.id}>{movie.original_title}</div>)}
      </div>
    );
  }

  // If both similarMovies and recommendedMovies are defined, return both
  return (
    <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {filteredRecommendedMovies.slice(0, 10).map((recommendedMovie) => (
        <RecommendedMovieImage
          key={recommendedMovie.id}
          movieId={recommendedMovie.id.toString()}
        />
      ))}
      {filteredSimilarMovies.slice(0, 10).map((similarMovie) => (
        <RecommendedMovieImage
          key={similarMovie.id}
          movieId={similarMovie.id.toString()}
        />
      ))}
    </ul>
  );
};

export default MovieRecommendations;
