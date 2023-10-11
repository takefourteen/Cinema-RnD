"use client";

import { Suspense } from "react";

import SectionHeader from "@/components/SectionHeader";
import SliderBody from "@/components/slider-v-3.0/SliderBody";
import Slider from "@/components/slider-v-3.0/Slider";
import MotionMediaCard from "@/components/slider-v-3.0/MotionMediaCard";
import HorizontalMotionMediaCard from "@/components/slider-v-3.0/HorizontalMotionMediaCard";
import Skeleton from "@/components/Skeleton";

interface RenderSliderProps {
  trendingData: any[];
  listItemsOrientation: "verticle" | "horizontal";
  sectionTitle: string;
  showSliderProgress: boolean;
  viewAllLink?: string;
  listItemsPriority?: boolean;
}

const RenderSlider = ({
  trendingData,
  listItemsOrientation,
  sectionTitle,
  viewAllLink,
  listItemsPriority = false,
  showSliderProgress = true,
}: RenderSliderProps) => {
  // Define slider header component
  const sliderHeaderComponent = (
    <SectionHeader sectionTitle={sectionTitle} viewAllLink={viewAllLink} />
  );

  // Define slider body component
  const sliderBodyComponent = (
    <SliderBody
      sliderData={trendingData}
      initData={trendingData[0]}
      showSliderProgress={showSliderProgress}
      classNames={{
        ulList: "gap-x-4",
      }}
      renderSliderList={(item) =>
        listItemsOrientation === "verticle" ? (
          <MotionMediaCard
            key={item.id}
            data={item}
            aspect_ratio="2:3"
            priority={listItemsPriority}
          />
        ) : (
          <Suspense fallback={<Skeleton />}>
            <HorizontalMotionMediaCard
              key={item.id}
              mediaId={item.id}
              mediaType={item.original_name ? "tv" : "movie"}
              priority={listItemsPriority}
            />
          </Suspense>
        )
      }
    />
  );

  return (
    <Slider
      sliderHeaderComponent={sliderHeaderComponent}
      sliderBodyComponent={sliderBodyComponent}
    />
  );
};

export default RenderSlider;
