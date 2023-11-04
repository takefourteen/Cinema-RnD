"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

import SectionHeader from "@/components/SectionHeader";
import SliderBody from "@/components/slider/SliderBody";
import Slider from "@/components/slider/Slider";
import { AspectRatio } from "../ui/aspect-ratio";
import CardSkeleton from "../skeletons/CardSkeleton";

const DataFetchingMotionMediaCard = dynamic(
  () => import("@/components/cards/DataFetchingMotionMediaCard"),
  {
    loading: () => (
      <div className="relative h-auto min-w-[150px] sm:min-w-[170px] md:min-w-[180px] lg:min-w-[215px] xl:min-w-[250px] 2xl:min-w-[300px]">
        <AspectRatio ratio={2 / 3}>
          <CardSkeleton />
        </AspectRatio>
      </div>
    ),
  },
);

interface RenderSliderProps {
  isFirstChild?: boolean;
  sliderData: any[];
  sectionTitle: string;
  showSliderProgress?: boolean;
  viewAllLink?: string;
  listItemsPriority?: boolean;
  largeListItem?: boolean;
}

const RenderSlider = ({
  isFirstChild = false,
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
      classNames={{
        ulList: "relative gap-x-2 ",
      }}
      renderSliderList={(item) => (
        <Suspense>
          <DataFetchingMotionMediaCard
            key={item.id}
            mediaId={item.id}
            mediaType={item.original_name ? "tv" : "movie"}
            priority={listItemsPriority}
            imgSize={largeListItem ? "large" : "default"}
            padding="p-[2px]"
          />
        </Suspense>
      )}
    />
  );

  return (
    <section
      className={`master-container 
    ${isFirstChild ? "mt-4" : " pt-[64px] lg:pt-[72px]"}
    `}
    >
      <Slider
        sliderHeaderComponent={sliderHeaderComponent}
        sliderBodyComponent={sliderBodyComponent}
      />
    </section>
  );
};

export default RenderSlider;
