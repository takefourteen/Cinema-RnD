import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

import Slider from "@/components/application-group/discovery-route/Slider";

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
      <Slider data={filteredTrendingMovies} />
    </section>
  );
};

export default page;
