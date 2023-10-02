"use client";

import SliderHeader from "@/components/slider-v-2.0/SliderHeader";
import SliderBody from "@/components/slider-v-3.0/SliderBody";
import Slider from "@/components/slider-v-3.0/Slider";
import MotionMediaCard from "@/components/slider-v-3.0/MotionMediaCard";

interface TrendingMoviesSliderProps {
  trendingMovies: TrendingMovie[];
}

const TrendingMoviesSlider = ({
  trendingMovies,
}: TrendingMoviesSliderProps) => {
  // Define slider header component
  const sliderHeaderComponent = (
    <SliderHeader sectionTitle="Blockbuster Buzz" />
  );

  // Define slider body component
  const sliderBodyComponent = (
    <SliderBody
      sliderData={trendingMovies}
      initData={trendingMovies[0]}
      classNames={{
        ulList: "gap-x-4",
      }}
      renderChild={(item) => (
        <MotionMediaCard
          key={item.id}
          data={item}
          aspect_ratio="2:3"
          priority={true}
        />
      )}
    />
  );

  return (
    <>
      <Slider
        sliderHeaderComponent={sliderHeaderComponent}
        sliderBodyComponent={sliderBodyComponent}
      />
    </>
  );
};

export default TrendingMoviesSlider;
