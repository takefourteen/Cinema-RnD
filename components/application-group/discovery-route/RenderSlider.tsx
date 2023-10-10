"use client";

import SectionHeader from "@/components/SectionHeader";
import SliderBody from "@/components/slider-v-3.0/SliderBody";
import Slider from "@/components/slider-v-3.0/Slider";
import MotionMediaCard from "@/components/slider-v-3.0/MotionMediaCard";

interface RenderSliderProps {
  trendingData: any[];
  sectionTitle: string;
  viewAllLink?: string;
  priority?: boolean;
}

const RenderSlider = ({
  trendingData,
  sectionTitle,
  viewAllLink,
  priority = false,
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
      showProgress={true}
      classNames={{
        ulList: "gap-x-4",
      }}
      renderSliderList={(item) => (
        <MotionMediaCard
          key={item.id}
          data={item}
          aspect_ratio="2:3"
          priority={priority}
        />
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
