import { Suspense } from "react";
import { Metadata } from "next";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchTrendingMovies } from "@/lib/tmdb-api/trending";
import { fetchTrendingTVSeries } from "@/lib/tmdb-api/trending";

import DiscoverySlider from "@/components/application-group/home-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/home-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import YourLibrary from "@/components/application-group/home-route/YourLibrary";
import CategorySlider from "@/components/application-group/home-route/hero-section/slider/CategorySlider";
import CarouselSkeleton from "@/components/skeletons/CarouselSkeleton";

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
        {movieAndTvShowDetails.slice(0, 15).map((item, index) => (
          <DiscoveryHeroSectionSliderBody
            key={item.id}
            movieOrTvShowDetails={item}
            priority={index === 0 ? true : false}
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

      {/* Render Slider for each Category */}

      <CategorySlider
        type="trending"
        title="Latest Blockbuster Movies"
        data={trendingMovies.slice(0, 10)}
      />

      <CategorySlider
        type="trending"
        title="Latest BingeWorthy Tv Series"
        data={trendingTVSeries.slice(0, 10)}
      />

      <Suspense fallback={<CarouselSkeleton />}>
        <CategorySlider
          type={"notTrending"}
          // data={category}
        />
      </Suspense>

      {/*
        -----------------
        Collections
        -----------------
       */}
      {/* <CollectionsSlideShow /> */}
    </section>
  );
};

export default page;
