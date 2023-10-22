import { fetchMultiplePagesOfPopularMovies } from "@/lib/tmdb-api/popular";

import RenderSlider from "@/components/slider/RenderSlider";

const PopularMoviesSlider = async () => {
  const popularMovies: PopularMovie[] =
    await fetchMultiplePagesOfPopularMovies(1);

  return (
    <RenderSlider
      sliderData={popularMovies.slice(0, 11)}
      sectionTitle="Popular Movies"
      listItemsPriority={true}
      viewAllLink="/movies/popular"
      showSliderProgress={false}
    />
  );
};

export default PopularMoviesSlider;
