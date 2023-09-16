import {
  getPopularTVShowsForPages,
  getPopularMovies,
} from "@/lib/tmdb-api/popular";

import Slider from "@/components/slider/Slider";
import MediaCard from "@/components/MediaCard";

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
    <Slider
      lengthOfList={popularMovies.length}
      sectionTitle="Popular Movies"
      viewAllLink="/movies"
    >
      <ul className="flex gap-x-2">
        {popularMovies.map((movie) => (
          <MediaCard
            key={movie.id}
            data={movie}
            aspect_ratio="9:16"
            loaderType="spinner"
          />
        ))}
      </ul>
    </Slider>
  );
};

export default PopularMoviesSlider;
