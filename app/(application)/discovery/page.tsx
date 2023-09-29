import { Suspense } from "react";

import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import DiscoverySlider from "@/components/application-group/discovery-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/discovery-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import LoadingSpinner from "@/components/LoadingSpinner";

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

  // mix the movies and tv shows together into one array. only 2 of each
  const mixedTrending: (TrendingMovie | TrendingTVShow)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(filteredTrendingMovies[i]);
    mixedTrending.push(filteredTrendingTVShows[i]);
  }

  // fetch each movie or tv show details based on the mixedTrending.type, and store them in an array
  const movieAndTvShowDetailsPromise = mixedTrending.map(async (item) => {
    const { data, error } =
      item.media_type === "movie"
        ? await fetchMovieDetails(item.id)
        : await fetchTvSeriesDetails(item.id);

    // if there is an error, throw it
    if (error) {
      throw new Error(error);
    }

    // if there is no data, throw an error with a creative ux message
    if (!data) {
      throw new Error(
        `Oops! We couldn't find the details for this ${
          item.media_type === "movie" ? "movie" : "tv show"
        }. Please try again later.`,
      );
    }

    return data;
  });

  const movieAndTvShowDetails = await Promise.all(movieAndTvShowDetailsPromise);

  return (
    <section className="text-white">
      {/* map through the movieAndTvShowDetails and render a acrouselItem */}
      <Suspense fallback={<LoadingSpinner />}>
        <DiscoverySlider lengthOfList={movieAndTvShowDetails.length}>
          <div className="flex gap-x-0">
            {movieAndTvShowDetails.map((item) => (
              <DiscoveryHeroSectionSliderBody
                key={item.id}
                movieOrTvShowDetails={item}
              />
            ))}
          </div>
        </DiscoverySlider>
      </Suspense>
    </section>
  );
};

export default page;
