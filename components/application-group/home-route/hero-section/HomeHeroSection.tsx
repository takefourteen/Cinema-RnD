import { Suspense } from "react";

import {
  fetchMultiplePagesOfTrendingMovies,
  fetchMultiplePagesOfTrendingTVShows,
} from "@/lib/tmdb-api/trending";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import DiscoverySlider from "./slider/DiscoverySlider";
import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import DiscoveryHeroSectionSliderBody from "./slider/DiscoveryHeroSectionSliderBody";

const HomeHeroSection = async () => {
  const trendingPromises = [
    fetchMultiplePagesOfTrendingMovies(1),
    fetchMultiplePagesOfTrendingTVShows(1),
  ];

  const [trendingMovies, trendingTvShows] = await Promise.all(trendingPromises);

  const mixedTrending: (TrendingMovie | TrendingTVSeries)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(trendingMovies[i]);
    mixedTrending.push(trendingTvShows[i]);
  }

  // fetch each movie or tv show details based on the mixedTrending.type, and store them in an array
  const movieAndTvShowDetailsPromise = mixedTrending.map(async (item) => {
    const data =
      item.media_type === "movie"
        ? await fetchMovieDetails(item.id)
        : await fetchTvSeriesDetails(item.id);

    return data;
  });

  const movieAndTvShowDetails = await Promise.all(movieAndTvShowDetailsPromise);

  return (
    <DiscoverySlider lengthOfList={movieAndTvShowDetails.length}>
      <ul className="flex gap-x-0">
        {movieAndTvShowDetails.map((item) => (
          <Suspense
            key={item.id}
            fallback={
              <div className=" h-[70dvh] w-[100vw] flex-1 md:h-[75dvh]">
                <LoadingSpinner />
              </div>
            }
          >
            <DiscoveryHeroSectionSliderBody movieOrTvShowDetails={item} />
          </Suspense>
        ))}
      </ul>
    </DiscoverySlider>
  );
};

export default HomeHeroSection;
