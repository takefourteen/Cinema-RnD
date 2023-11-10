"use client";

import dynamic from "next/dynamic";

import SectionHeader from "@/components/SectionHeader";
import SliderBody from "@/components/slider/SliderBody";
import Slider from "@/components/slider/Slider";
import DataFetchingMediaCardSkeleton from "../skeletons/DataFetchingMediaCardSkeleton";

const DataFetchingMotionMediaCard = dynamic(
  () => import("@/components/cards/DataFetchingMotionMediaCard"),
  {
    loading: () => <DataFetchingMediaCardSkeleton />,
  }
);

interface RenderSliderProps {
  sliderData: any[];
  sectionTitle: string;
  viewAllLink?: string;
  listItemsPriority?: boolean;
  largeListItem?: boolean;
}

const RenderSlider = ({
  sliderData,
  sectionTitle,
  viewAllLink,
  listItemsPriority = false,
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
        <DataFetchingMotionMediaCard
          key={item.id}
          mediaId={item.id}
          mediaType={item.original_name ? "tv" : "movie"}
          priority={listItemsPriority}
          imgSize={largeListItem ? "large" : "default"}
          padding="p-[2px]"
        />
      )}
    />
  );

  return (
    <section
      className={`master-container  pt-[64px] lg:pt-[72px]"}
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
