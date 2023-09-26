import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

import Carousel from "@/components/application-group/discovery-route/carousel/Carousel";

const page = async () => {
  const trendingMoviesPromise = fetchTrendingMovies();
  const trendingTVShowsPromise = fetchTrendingTVShows();

  const [trendingMoviesResponse, trendingTVShowsResponse] = await Promise.all([
    trendingMoviesPromise,
    trendingTVShowsPromise,
  ]);

  const filteredTrendingMovies = filterResultsByLanguage(
    trendingMoviesResponse.data || [],
    "en",
  );
  const filteredTrendingTVShows = filterResultsByLanguage(
    trendingTVShowsResponse.data || [],
    "en",
  );

  return (
    <section className="text-white">
      <Carousel data={filteredTrendingMovies.slice(0, 5)} />
    </section>
  );
};

export default page;
