"use client";

import SliderHeader from "@/components/slider-v-3.0/SliderHeader";
import SliderBody from "@/components/slider-v-3.0/SliderBody";
import Slider from "@/components/slider-v-3.0/Slider";
import MotionMediaCard from "@/components/slider-v-3.0/MotionMediaCard";

interface TrendingSliderProps {
  trendingData: any[];
  sectionTitle: string;
  viewAllLink?: string;
  priority?: boolean;
}

const TrendingSlider = ({
  trendingData,
  sectionTitle,
  viewAllLink,
  priority = false,
}: TrendingSliderProps) => {
  // Define slider header component
  const sliderHeaderComponent = (
    <SliderHeader sectionTitle={sectionTitle} viewAllLink={viewAllLink} />
  );

  // Define slider body component
  const sliderBodyComponent = (
    <SliderBody
      sliderData={trendingData}
      initData={trendingData[0]}
      classNames={{
        ulList: "gap-x-4",
      }}
      renderChild={(item) => (
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

export default TrendingSlider;
