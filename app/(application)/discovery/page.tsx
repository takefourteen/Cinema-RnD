import { Suspense } from "react";

import {
  fetchTrendingMovies,
  fetchTrendingTVShows,
  fetchMultipleTrendingMoviesPages,
  fetchMultipleTrendingTVShowsPages,
} from "@/lib/tmdb-api/trending";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import DiscoverySlider from "@/components/application-group/discovery-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/discovery-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import LoadingSpinner from "@/components/LoadingSpinner";
import StreamingServicesSlideShow from "@/components/application-group/discovery-route/StreamingServicesSlideShow";
import TrendingMoviesSlider from "@/components/application-group/discovery-route/TrendingMoviesSlider";
import TrendingTVShowsSlider from "@/components/application-group/discovery-route/TrendingTvSeriesSlider";

// ===================================
// Time-based Revalidation in Next.js
// ===================================
export const revalidate = 3600 * 24; // 24 hours

const page = async () => {
  const trendingMoviesPromise = fetchMultipleTrendingMoviesPages(2);
  const trendingTVShowsPromise = fetchMultipleTrendingTVShowsPages(2);

  const [trendingMoviesResponse, trendingTVShowsResponse] = await Promise.all([
    trendingMoviesPromise,
    trendingTVShowsPromise,
  ]);

  // destructuring the data from the response
  const { data: trendingMoviesData } = trendingMoviesResponse;
  const { data: trendingTVShowsData } = trendingTVShowsResponse;

  // ==============================
  // if there is an error, throw it
  // ==============================
  if (trendingMoviesResponse.error) {
    throw new Error(trendingMoviesResponse.error);
  }

  if (trendingTVShowsResponse.error) {
    throw new Error(trendingTVShowsResponse.error);
  }

  // ==============================================================
  // if there is no data, throw an error with a creative ux message
  // ==============================================================
  if (!trendingMoviesData) {
    throw new Error(
      "Oops! We couldn't find the trending movies. Please try again later.",
    );
  }

  if (!trendingTVShowsData) {
    throw new Error(
      "Oops! We couldn't find the trending tv shows. Please try again later.",
    );
  }

  // mix the movies and tv shows together into one array. only 2 of each
  const mixedTrending: (TrendingMovie | TrendingTVSeries)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(trendingMoviesData[i]);
    mixedTrending.push(trendingTVShowsData[i]);
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
    <section>
      {/*
        -----------
        Hero Section 
        -----------
       */}
      <Suspense fallback={<LoadingSpinner />}>
        <DiscoverySlider lengthOfList={movieAndTvShowDetails.length}>
          <ul className="flex gap-x-0">
            {movieAndTvShowDetails.map((item) => (
              <DiscoveryHeroSectionSliderBody
                key={item.id}
                movieOrTvShowDetails={item}
              />
            ))}
          </ul>
        </DiscoverySlider>
      </Suspense>

      {/*
        -----------------------------------------------------
        Infinite Slide show displaying all Streaming services 
        -----------------------------------------------------
       */}
      <StreamingServicesSlideShow />

      {/*
        --------------
        Trending Movies 
        --------------
       */}
      <TrendingMoviesSlider trendingMovies={trendingMoviesData} />

      {/*
        -----------------
        Trending TV Series 
        -----------------
       */}
      <TrendingTVShowsSlider trendingTvSeries={trendingTVShowsData} />
    </section>
  );
};

export default page;
