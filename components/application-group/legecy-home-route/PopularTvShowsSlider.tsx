import { fetchMultiplePagesOfPopularTvSeries } from "@/lib/tmdb-api/popular";

import RenderSlider from "@/components/slider-v-3.0/RenderSlider";

const PopularTvShowsSlider = async () => {
  const popularTVSeries: PopularTvSeries[] =
    await fetchMultiplePagesOfPopularTvSeries(2);

  return (
    <RenderSlider
      sliderData={popularTVSeries.slice(0, 11)}
      sectionTitle="Popular Tv Shows"
      listItemsOrientation="horizontal"
      listItemsPriority={true}
      viewAllLink="/tv/popular"
      showSliderProgress={false}
    />
  );
};

export default PopularTvShowsSlider;
