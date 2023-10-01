import Slider from "@/components/slider-v-2.0/Slider";
import SliderHeader from "@/components/slider-v-2.0/SliderHeader";

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

  // Render Slider with header component
  return (
    <>
      <Slider
        sliderData={trendingMovies}
        initData={trendingMovies[0]}
        sliderHeaderComponent={sliderHeaderComponent}
        imageAspectRatio="2:3"
        imageLoaderType="spinner"
        loadPriority={true}
      />
    </>
  );
};

export default TrendingMoviesSlider;
