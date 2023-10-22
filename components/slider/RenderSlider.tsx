"use client";

import { Suspense } from "react";

import SectionHeader from "@/components/SectionHeader";
import SliderBody from "@/components/slider/SliderBody";
import Slider from "@/components/slider/Slider";
import DataFetchingMotionMediaCard from "@/components/cards/DataFetchingMotionMediaCard";

interface RenderSliderProps {
  sliderData: any[];
  sectionTitle: string;
  showSliderProgress: boolean;
  viewAllLink?: string;
  listItemsPriority?: boolean;
  largeListItem?: boolean;
}

const RenderSlider = ({
  sliderData,
  sectionTitle,
  viewAllLink,
  listItemsPriority = false,
  showSliderProgress = true,
  largeListItem = false,
}: RenderSliderProps) => {
  // Define slider header component
  const sliderHeaderComponent = (
    <SectionHeader
      sectionTitle={sectionTitle}
      viewAllLink={viewAllLink}
      showBorder={false}
    />
  );

  // Define slider body component
  const sliderBodyComponent = (
    <SliderBody
      sliderData={sliderData}
      initData={sliderData[0]}
      showSliderProgress={showSliderProgress}
      classNames={{
        ulList: "relative gap-x-4 ",
      }}
      renderSliderList={(item) => (
        <Suspense>
          <DataFetchingMotionMediaCard
            key={item.id}
            mediaId={item.id}
            mediaType={item.original_name ? "tv" : "movie"}
            priority={listItemsPriority}
            imgSize={largeListItem ? "large" : "default"}
          />
        </Suspense>
      )}
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
