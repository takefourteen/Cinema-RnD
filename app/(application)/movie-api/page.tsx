import React from "react";

import { getPopularMovies } from "@/lib/tmdb-api/popular";

const page = async () => {
  const { data: movies, loading, error } = await getPopularMovies(1, "VE");

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 overflow-scroll pt-[100px] text-white">
      <h1 className="text-center text-4xl font-semibold text-red-700">
        Movies
      </h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </div>
  );
};

export default page;
