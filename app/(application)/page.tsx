import { Suspense } from "react";

import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import YourLibrary from "@/components/application-group/home-route/YourLibrary";
import StreamingServicesSlideShow from "@/components/application-group/home-route/streaming-services/StreamingServicesSlideShow";
import CollectionsSlideShow from "@/components/application-group/home-route/collections/CollectionsSlideShow";
import ColorFulBanner from "@/components/application-group/legecy-home-route/ColorFulBanner";
import HomeHeroSection from "@/components/application-group/home-route/hero-section/HomeHeroSection";
import CategoriesSlider from "@/components/application-group/home-route/hero-section/slider/CategoriesSlider";
import AnimatedStringLoader from "@/components/skeletons/AnimatedStringLoader";
import DataFetchingMediaCardSkeleton from "@/components/skeletons/DataFetchingMediaCardSkeleton";

// ===================================
// Time-based Revalidation in Next.js
// ===================================
export const revalidate = 3600 * 24; // 24 hours

const page = () => {
  return (
    <section>
      {/*
        -----------
        Hero Section 
        -----------
       */}
      <Suspense
        fallback={
          <div className=" h-[70dvh] w-[100vw] flex-1 md:h-[75dvh]">
            <LoadingSpinner />
          </div>
        }
      >
        <HomeHeroSection />
      </Suspense>
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
        fallback={
          <div className="master-container flex h-full w-full flex-col ">
            <h2 className="font-header-3 flex items-baseline font-bold capitalize text-white ">
              Loading Content &nbsp;{" "}
              <AnimatedStringLoader loadingString="..." />
            </h2>
            <div className="mt-4 flex gap-x-2 overflow-hidden">
              {Array.from({ length: 10 }, (_, i) => (
                <DataFetchingMediaCardSkeleton key={i} />
              ))}
            </div>
          </div>
        }
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
