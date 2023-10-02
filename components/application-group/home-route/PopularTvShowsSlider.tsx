import { getPopularTVShowsForPages } from "@/lib/tmdb-api/popular";

import TrendingSlider from "../discovery-route/TrendingSlider";

const PopularTvShowsSlider = async () => {
  const { data: popularTVShows, error } = await getPopularTVShowsForPages(2);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!popularTVShows) {
    return <div>No tv shows found</div>;
  }

  return (
    <TrendingSlider
      trendingData={popularTVShows.slice(0, 11)}
      sectionTitle="Popular Tv Shows"
      viewAllLink="/tv/popular"
    />
  );
};

export default PopularTvShowsSlider;
