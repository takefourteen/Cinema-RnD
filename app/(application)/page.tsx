import { Suspense } from "react";
import { Metadata } from "next";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchTrendingMovies } from "@/lib/tmdb-api/trending";
import { fetchTrendingTVSeries } from "@/lib/tmdb-api/trending";

import DiscoverySlider from "@/components/application-group/home-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/home-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import YourLibrary from "@/components/application-group/home-route/YourLibrary";
import AnimatedStringLoader from "@/components/skeletons/AnimatedStringLoader";
import DataFetchingMediaCardSkeleton from "@/components/skeletons/DataFetchingMediaCardSkeleton";
import CategoriesSlider from "@/components/application-group/home-route/hero-section/slider/CategoriesSlider";

export const metadata: Metadata = {
  title: {
    absolute: "CozyCinema - Stream Movies and TV Shows for Free",
  },
  description:
    "Indulge in a cozy streaming experience at CozyCinema. Watch unlimited movies and TV series for free, anytime, anywhere. Discover a vast collection of cinematic gems tailored for your comfort. No subscription required. Your ultimate destination for premium, cost-free entertainment.",
};

const page = async () => {
  // fetch trending movies and tv shows
  const [trendingMovies, trendingTVSeries] = await Promise.all([
    fetchTrendingMovies(),
    fetchTrendingTVSeries(),
  ]);

  // mix the movies and tv shows together into one array. only 2 of each
  const mixedTrending: (TrendingMovie | TrendingTVSeries)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(trendingMovies[i]);
    mixedTrending.push(trendingTVSeries[i]);
  }

  // fetch details for each movie and tv show
  const movieAndTvShowDetailsPromise = mixedTrending.map((item) => {
    return item.media_type === "movie"
      ? fetchMovieDetails(item.id)
      : fetchTvSeriesDetails(item.id);
  });

  // Wait for all promises to resolve
  const movieAndTvShowDetails = await Promise.all(movieAndTvShowDetailsPromise);

  return (
    <section>
      {/*
        -----------
        Hero Section 
        -----------
       */}
      <DiscoverySlider lengthOfList={movieAndTvShowDetails.length}>
        {movieAndTvShowDetails.slice(0, 15).map((item) => (
          <DiscoveryHeroSectionSliderBody
            key={item.id}
            movieOrTvShowDetails={item}
          />
        ))}
      </DiscoverySlider>
      {/*
        ------------------
        Streaming services 
        ------------------
       */}
      {/* <StreamingServicesSlideShow /> */}

      {/*
        -----------------
        Your Library 
        -----------------
       */}
      <YourLibrary />

      {/* map through homeData and render a slider */}
      <Suspense
        fallback={Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="master-container mt-4 flex h-full w-full flex-col"
          >
            <h2 className="font-header-3 flex items-baseline font-bold capitalize text-white ">
              Loading Category &nbsp;{" "}
              <AnimatedStringLoader loadingString="..." />
            </h2>
            <div className="mt-4 flex gap-x-2 overflow-hidden">
              {Array.from({ length: 8 }, (_, j) => (
                <DataFetchingMediaCardSkeleton key={j} loader="spinner" />
              ))}
            </div>
          </div>
        ))}
      >
        <CategoriesSlider />
      </Suspense>

      {/*
        -----------------
        Collections
        -----------------
       */}
      {/* <CollectionsSlideShow /> */}

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
