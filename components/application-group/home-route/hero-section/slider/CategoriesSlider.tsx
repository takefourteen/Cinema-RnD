import dynamic from "next/dynamic";

import { fetchAllDataForHome } from "@/helpers/fetchAllDataForHome";

// import RenderSlider from "@/components/slider/RenderSlider";
const RenderSlider = dynamic(() => import("@/components/slider/RenderSlider"));

const CategoriesSlider = async () => {
  // fetch the data for the home page
  const homeData = await fetchAllDataForHome();

  return homeData.map((sliderData, index) => (
    <RenderSlider
      key={sliderData.title}
      isFirstChild={index === 0}
      sliderData={sliderData.data}
      sectionTitle={sliderData.title}
      listItemsPriority={sliderData.hasPriority}
      largeListItem={sliderData.standOut}
    />
  ));
};

export default CategoriesSlider;
