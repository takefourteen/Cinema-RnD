import React from "react";

import { fetchMovieRecommendations } from "@/lib/tmdb-api/recommendations";

type MovieRecommendationsProps = {
  movieId: string;
};

const MovieRecommendations = async ({ movieId }: MovieRecommendationsProps) => {
  const { data: movieRecommendations, error } =
    await fetchMovieRecommendations(movieId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieRecommendations) {
    return <div>Loading...</div>;
  }

  return (
    <section className="master-container pt-[70px] md:pt-0">
      <header>
        <h2 className="text-2xl font-bold capitalize text-white md:text-3xl">
          You may also enjoy...
        </h2>

        {/*  quick test -  Display the title of the movie recommendations */}
        {movieRecommendations.slice(0, 12).map((movie) => (
          <div key={movie.id}>{movie.original_title}</div>
        ))}
      </header>
    </section>
  );
};

export default MovieRecommendations;
