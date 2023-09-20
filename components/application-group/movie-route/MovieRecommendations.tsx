import React from "react";

import { fetchMovieRecommendations } from "@/lib/tmdb-api/recommendations";
import { fetchSimilarMovies } from "@/lib/tmdb-api/similar";

import Skeleton from "@/components/Skeleton";

type MovieRecommendationsProps = {
  movieId: string;
};

const MovieRecommendations = async ({ movieId }: MovieRecommendationsProps) => {
  const { data: similarMovies, error: similarMoviesError } =
    await fetchSimilarMovies(movieId);
  const { data: recommendedMovies, error: recommendedMoviesError } =
    await fetchMovieRecommendations(movieId);

  if (similarMoviesError && recommendedMoviesError) {
    return <div>Error: {similarMoviesError || recommendedMoviesError}</div>;
  }

  if (!similarMovies && !recommendedMovies) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={2} />
        ))}
      </div>
    );
  }

  return (
    <section className="master-container pt-[70px] md:pt-0">
      {/*  quick test -  Display the title of the movie recommendations */}
      {recommendedMovies
        ?.slice(0, 12)
        .map((movie) => <div key={movie.id}>{movie.original_title}</div>)}
    </section>
  );
};

export default MovieRecommendations;
