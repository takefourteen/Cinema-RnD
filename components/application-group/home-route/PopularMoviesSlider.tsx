import { fetchMultiplePagesOfPopularMovies } from "@/lib/tmdb-api/popular";

import RenderSlider from "@/components/slider-v-3.0/RenderSlider";

const PopularMoviesSlider = async () => {
  const popularMovies: PopularMovie[] =
    await fetchMultiplePagesOfPopularMovies(1);

  return (
    <RenderSlider
      trendingData={popularMovies.slice(0, 11)}
      sectionTitle="Popular Movies"
      listItemsOrientation="verticle"
        listItemsPriority={true}
      viewAllLink="/movies/popular"
      showSliderProgress={false}
    />
  );
};

export default PopularMoviesSlider;
