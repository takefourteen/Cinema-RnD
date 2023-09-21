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

  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pb-[70px] text-white">
      <MovieHeader movieDetails={movieDetails} />

      {/* Display Movie Recommendations */}
      <div className="master-container mx-auto lg:max-w-[80%]">
        {/* Heading */}
        <header className="mb-4 mt-8 md:mb-6 md:mt-8">
          <h2 className="text-2xl font-bold capitalize text-white md:text-3xl ">
            Movies on Your Radar
            {/*
              - A Taste of Your Style
              - Curated Selection for You
              - A Taste of Your Style
            */}
          </h2>
        </header>
        <MovieRecommendations movieId={movieId} />
      </div>
    </section>
  );
};

export default page;
