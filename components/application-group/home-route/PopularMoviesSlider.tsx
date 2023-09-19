import {
  getPopularTVShowsForPages,
  getPopularMovies,
} from "@/lib/tmdb-api/popular";

// import { Slider as oldSlider } from "@/components/slider/Slider";
import Slider from "@/components/slider-v-2.0/Slider";
import SliderHeader from "@/components/slider-v-2.0/SliderHeader";

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

  // Define slider header component
  const sliderHeaderComponent = (
    <SliderHeader sectionTitle="Popular Movies" viewAllLink="/movies/popular" />
  );

  // Render Slider with header component
  return (
    <>
      <Slider
        sliderData={popularMovies}
        initData={popularMovies[0]}
        sliderHeaderComponent={sliderHeaderComponent}
        imageAspectRatio="9:16"
        imageLoaderType="spinner"
      />
    </>
  );
};

export default PopularMoviesSlider;
