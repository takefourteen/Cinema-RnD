import React from "react";

import {
  getPopularTVShowsForPages,
  getPopularTVShows,
  filterTVShowsByOriginCountry,
} from "@/lib/tmdb-api/popular";

const page = async () => {
  // const { data: tvShows, loading, error } = await getPopularTVShowsForPages(10);
  const { data: tvShows, error } = await getPopularTVShows(1, "US");

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!tvShows) {
    return <div>No tv shows found</div>;
  }

  // const filteredTVShows = filterTVShowsByOriginCountry(tvShows, "ZA");

  return (
    <div className="flex flex-col gap-8 overflow-scroll pt-[100px] text-white">
      <h1 className="text-center text-4xl font-semibold text-red-700">
        Tv Shows - {tvShows.length}
      </h1>
      <pre>{JSON.stringify(tvShows, null, 2)}</pre>
    </div>
  );
};

export default page;
