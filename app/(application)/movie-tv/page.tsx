import React from "react";

import { getPopularMovies } from "@/lib/tmdb-api/popular";
import { searchAll } from "@/lib/tmdb-api/search";

const page = async () => {
  // const { data: movies,  error } = await getPopularMovies(1, "VE");
  const { data, error } = await searchAll("avengers", 1, "VE");
  const { results: searchResults } = data || {};

  // console.log(`movies`, movies.results);
  // console.log(`tvShows`, tvShows);
  console.log(`searchResults`, searchResults);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!searchResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-8 overflow-scroll pt-[100px] text-white">
      <h1 className="text-center text-4xl font-semibold text-red-700">
        Movies and TV Shows
      </h1>
    </div>
  );
};

export default page;
