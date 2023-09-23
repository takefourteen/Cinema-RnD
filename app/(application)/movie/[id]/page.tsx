import React from "react";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";


import MovieDetailsTop from "@/components/application-group/movie-route/top-section/MovieDetailsTop";
import MovieDetailsMiddle from "@/components/application-group/movie-route/middle-section/MovieDetailsMiddle";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;

  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  const { data: movieDetails, error: movieDetailsError } =
    await fetchMovieDetails(movieId);

  /*
    if there is an error fetching similarMovies and recommendedMovies, 
    throw an error that will be caught by the ErrorBoundary (error.tsx)
   */
  if (movieDetailsError) {
    throw new Error(`Error fetching movie details: ${movieDetailsError}`);
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

 

  return (
    <section className="pb-[70px] text-white">
      {/* Top Section */}
      <MovieDetailsTop movieDetails={movieDetails} />

      {/* Middle Section */}
      <MovieDetailsMiddle movieId={movieId} />
    </section>
  );
};

export default page;
