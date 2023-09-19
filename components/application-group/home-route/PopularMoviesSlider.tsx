import {
  getPopularTVShowsForPages,
  getPopularMovies,
} from "@/lib/tmdb-api/popular";

// import { Slider as oldSlider } from "@/components/slider/Slider";
import Slider from "@/components/slider-v-2.0/Slider";

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
    <>
      <Slider sliderData={popularMovies} initData={popularMovies[0]} />
    </>
  );
};

export default PopularMoviesSlider;
