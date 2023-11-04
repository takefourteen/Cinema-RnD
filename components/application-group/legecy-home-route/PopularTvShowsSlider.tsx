import { fetchMultiplePagesOfPopularTvSeries } from "@/lib/tmdb-api/popular";

import RenderSlider from "@/components/slider/RenderSlider";

const PopularTvShowsSlider = async () => {
  const popularTVSeries: PopularTvSeries[] =
    await fetchMultiplePagesOfPopularTvSeries(2);

  return (
    <RenderSlider
      sliderData={popularTVSeries.slice(0, 11)}
      sectionTitle="Popular Tv Shows"
      listItemsPriority={true}
      viewAllLink="/tv/popular"
    />
  );
};

export default PopularTvShowsSlider;
