import { fetchMultiplePagesOfPopularTvSeries } from "@/lib/tmdb-api/popular";

import TrendingSlider from "../discovery-route/TrendingSlider";

const PopularTvShowsSlider = async () => {
  const popularTVSeries: PopularTvSeries[] =
    await fetchMultiplePagesOfPopularTvSeries(2);

  return (
    <TrendingSlider
      trendingData={popularTVSeries.slice(0, 11)}
      sectionTitle="Popular Tv Shows"
      viewAllLink="/tv/popular"
    />
  );
};

export default PopularTvShowsSlider;
