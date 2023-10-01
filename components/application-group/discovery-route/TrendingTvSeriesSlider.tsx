import Slider from "@/components/slider-v-2.0/Slider";
import SliderHeader from "@/components/slider-v-2.0/SliderHeader";

interface TrendingTvSeriesSliderProps {
  trendingTvSeries: TrendingTVSeries[];
}

const TrendingTvSeriesSlider = ({
  trendingTvSeries,
}: TrendingTvSeriesSliderProps) => {
  // Define slider header component
  const sliderHeaderComponent = (
    <SliderHeader sectionTitle="Binge-Worthy Picks" />
  );

  // Render Slider with header component
  return (
    <>
      <Slider
        sliderData={trendingTvSeries}
        initData={trendingTvSeries[0]}
        sliderHeaderComponent={sliderHeaderComponent}
        imageAspectRatio="2:3"
        imageLoaderType="spinner"
      />
    </>
  );
};

export default TrendingTvSeriesSlider;
