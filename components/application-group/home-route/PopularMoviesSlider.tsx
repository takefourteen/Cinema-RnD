import {
  getPopularTVShowsForPages,
  getPopularMovies,
} from "@/lib/tmdb-api/popular";

import TrendingSlider from "../discovery-route/TrendingSlider";

const PopularMoviesSlider = async () => {
  const page = 1;
  const region = "US";
  const { data: popularMovies, error } = await getPopularMovies(page, region);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!popularMovies) {
    return <div>No movies found</div>;
  }

  return (
    <TrendingSlider
      trendingData={popularMovies.slice(0, 11)}
      sectionTitle="Popular Movies"
      viewAllLink="/movies/popular"
    />
  );
};

export default PopularMoviesSlider;
