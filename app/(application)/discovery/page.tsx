import { Suspense } from "react";
import dynamic from "next/dynamic";

import {
  fetchMultipleTrendingMoviesPages,
  fetchMultipleTrendingTVShowsPages,
} from "@/lib/tmdb-api/trending";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import LoadingSpinner from "@/components/LoadingSpinner";
import DiscoverySlider from "@/components/application-group/discovery-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/discovery-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import YourLibrary from "@/components/application-group/discovery-route/YourLibrary";
import ColorFulBanner from "@/components/application-group/home-route/ColorFulBanner";

// dynamically import the components
const StreamingServicesSlideShow = dynamic(
  () =>
    import(
      "@/components/application-group/discovery-route/streaming-services/StreamingServicesSlideShow"
    ),
  { ssr: false },
);

const TrendingSlider = dynamic(
  () => import("@/components/application-group/discovery-route/TrendingSlider"),
  { ssr: false },
);

const CollectionsSlideShow = dynamic(
  () =>
    import(
      "@/components/application-group/discovery-route/collections/CollectionsSlideShow"
    ),
  { ssr: false },
);

/* 
import StreamingServicesSlideShow from "@/components/application-group/discovery-route/streaming-services/StreamingServicesSlideShow";
import CollectionsSlideShow from "@/components/application-group/discovery-route/collections/CollectionsSlideShow";
import TrendingSlider from "@/components/application-group/discovery-route/TrendingSlider";
*/

// ===================================
// Time-based Revalidation in Next.js
// ===================================
export const revalidate = 3600 * 24; // 24 hours

const page = async () => {
  const trendingMoviesPromise = fetchMultipleTrendingMoviesPages(1);
  const trendingTVShowsPromise = fetchMultipleTrendingTVShowsPages(1);

  const [trendingMoviesData, trendingTVShowsData] = await Promise.all([
    trendingMoviesPromise,
    trendingTVShowsPromise,
  ]);

  // mix the movies and tv shows together into one array. only 2 of each
  const mixedTrending: (TrendingMovie | TrendingTVSeries)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(trendingMoviesData[i]);
    mixedTrending.push(trendingTVShowsData[i]);
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
    <section>
      {/*
        -----------
        Hero Section 
        -----------
       */}
      <Suspense>
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
        ------------------
        Streaming services 
        ------------------
       */}
      <StreamingServicesSlideShow />

      {/*
        -----------------
        Your Library 
        -----------------
       */}
      <YourLibrary />

      {/*
        --------------
        Trending Movies 
        --------------
       */}
      <TrendingSlider
        trendingData={trendingMoviesData.slice(0, 11)}
        sectionTitle="Blockbuster Buzz"
        priority={true}
      />

      {/*
        -----------------
        Trending TV Series 
        -----------------
      */}
      <TrendingSlider
        trendingData={trendingTVShowsData.slice(0, 11)}
        sectionTitle="Binge-Worthy Picks"
      />

      {/*
        -----------------
        Collections 
        -----------------
       */}
      <CollectionsSlideShow />

      {/*
        -----------------
        Colourful Banner 
        -----------------
       */}
      {/* <section className=" pt-[64px] text-white lg:pt-[72px]">
        <ColorFulBanner />
      </section> */}
    </section>
  );
};

export default page;
