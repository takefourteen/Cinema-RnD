import { FC } from "react";
import dynamic from "next/dynamic";

const RenderSlider = dynamic(() => import("@/components/slider/RenderSlider"));

import {
  type MovieCategory,
  type MovieAndTvSeriesCategories,
  type TvSeriesCategory,
  fetchAllDataForHome,
} from "@/constants/categoriesOnHomePage";

type TrendingCategory = {
  type: "trending";
  title: string;
  data: TrendingMovie[] | TrendingTVSeries[];
};

type CategorySliderData = {
  type: "notTrending";
  // data: {
  //   title: string;
  //   results: (DiscoverMovieResult | DiscoverTVSeriesResult)[];
  // };
};

type CategorySliderProps = TrendingCategory | CategorySliderData;

const CategorySlider: FC<CategorySliderProps> = async (props) => {
  // if the type is trending, then we can render the slider right away
  if (props.type === "trending") {
    return (
      <RenderSlider
        key={props.title}
        sliderData={props.data}
        sectionTitle={props.title}
      />
    );
  }

  // fetch all data for the home page
  const data = await fetchAllDataForHome();

  return data.map((category) => (
    <RenderSlider
      key={category.title}
      sliderData={category.results.slice(0, 10)}
      sectionTitle={category.title}
    />
  ));
};

export default CategorySlider;
