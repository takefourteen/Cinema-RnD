import { getPopularTVShowsForPages } from "@/lib/tmdb-api/popular";

import Slider from "@/components/slider/Slider";
import MediaCard from "@/components/MediaCard";

const PopularTvShowsSlider = async () => {
  const { data: popularTVShows, error } = await getPopularTVShowsForPages(5);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!popularTVShows) {
    return <div>No tv shows found</div>;
  }

  return (
    <Slider
      lengthOfList={popularTVShows.length}
      sectionTitle="Popular TV Shows"
      viewAllLink="/tv-shows"
    >
      <ul className="flex gap-x-2">
        {popularTVShows.slice(0, 10).map((tvShow) => (
          <MediaCard key={tvShow.id} data={tvShow} aspect_ratio="9:16" />
        ))}
      </ul>
    </Slider>
  );
};

export default PopularTvShowsSlider;
