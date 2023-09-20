import React from "react";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import MovieHeader from "@/components/application-group/movie-route/MovieHeader";
import MovieRecommendations from "@/components/application-group/movie-route/MovieRecommendations";

type PageProps = {
  params: {
    id: string;
  };
};

const page = async ({ params }: PageProps) => {
  const { id } = params;
  const { data: movieDetails, error } = await fetchMovieDetails(id);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="text-white">
      <MovieHeader movieDetails={movieDetails} />

      {/* Display Movie Recommendations */}
      <MovieRecommendations movieId={id} />
    </section>
  );
};

export default page;
