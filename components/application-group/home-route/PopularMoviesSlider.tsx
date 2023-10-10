import { fetchMultiplePagesOfPopularMovies } from "@/lib/tmdb-api/popular";

import TrendingSlider from "../discovery-route/TrendingSlider";

const PopularMoviesSlider = async () => {
  const popularMovies: PopularMovie[] = await fetchMultiplePagesOfPopularMovies(
    1
  );

  return (
    <TrendingSlider
      trendingData={popularMovies.slice(0, 11)}
      sectionTitle="Popular Movies"
      viewAllLink="/movies/popular"
    />
  );
};

export default PopularMoviesSlider;
