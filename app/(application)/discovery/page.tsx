import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

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
      <h1>Discovery</h1>
    </section>
  );
};

export default page;
