import { Suspense } from "react";
import dynamic from "next/dynamic";

import { fetchAllDataForHome } from "@/helpers/fetchAllDataForHome";
import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import LoadingSpinner from "@/components/LoadingSpinner";
import DiscoverySlider from "@/components/application-group/home-route/hero-section/slider/DiscoverySlider";
import DiscoveryHeroSectionSliderBody from "@/components/application-group/home-route/hero-section/slider/DiscoveryHeroSectionSliderBody";
import YourLibrary from "@/components/application-group/home-route/YourLibrary";
import StreamingServicesSlideShow from "@/components/application-group/home-route/streaming-services/StreamingServicesSlideShow";
import CollectionsSlideShow from "@/components/application-group/home-route/collections/CollectionsSlideShow";
import ColorFulBanner from "@/components/application-group/legecy-home-route/ColorFulBanner";

// dynamically import the slider
const RenderSlider = dynamic(
  () => import("@/components/slider-v-3.0/RenderSlider"),
  { ssr: false },
);

// ===================================
// Time-based Revalidation in Next.js
// ===================================
export const revalidate = 3600 * 24; // 24 hours

const page = async () => {
  // fetch the data for the home page
  const homeData = await fetchAllDataForHome();


  // mix the movies and tv shows together into one array. only 2 of each
  const mixedTrending: (TrendingMovie | TrendingTVSeries)[] = [];
  for (let i = 0; i < 2; i++) {
    mixedTrending.push(homeData[0].data[i]);
    mixedTrending.push(homeData[1].data[i]);
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
      <DiscoverySlider lengthOfList={movieAndTvShowDetails.length}>
        <ul className="flex gap-x-0">
          {movieAndTvShowDetails.map((item, index) => (
            <Suspense key={item.id} fallback={<LoadingSpinner />}>
              <DiscoveryHeroSectionSliderBody
                movieOrTvShowDetails={item}
                // only show priority for the first item
                priority={index === 0}
              />
            </Suspense>
          ))}
        </ul>
      </DiscoverySlider>
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

      {/* map through homeData and render a slider */}
      {homeData.map((sliderData) => (
        <RenderSlider
          key={sliderData.title}
          sliderData={sliderData.data}
          sectionTitle={sliderData.title}
          listItemsOrientation={sliderData.orientationStyle}
          listItemsPriority={sliderData.hasPriority}
          showSliderProgress={sliderData.viewWithProgressBar}
          largeListItem={sliderData.standOut}
        />
      ))}

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
