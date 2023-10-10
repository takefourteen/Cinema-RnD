import { fetchMultiplePagesOfPopularTvSeries } from "@/lib/tmdb-api/popular";

import RenderSlider from "../discovery-route/RenderSlider";

const PopularTvShowsSlider = async () => {
  const popularTVSeries: PopularTvSeries[] =
    await fetchMultiplePagesOfPopularTvSeries(2);

  return (
    <RenderSlider
      trendingData={popularTVSeries.slice(0, 11)}
      sectionTitle="Popular Tv Shows"
      viewAllLink="/tv/popular"
    />
  );
};

export default PopularTvShowsSlider;
