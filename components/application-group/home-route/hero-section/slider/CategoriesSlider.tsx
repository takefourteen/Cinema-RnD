import dynamic from "next/dynamic";

import { fetchAllDataForHome } from "@/helpers/fetchAllDataForHome";

import AnimatedStringLoader from "@/components/skeletons/AnimatedStringLoader";
import DataFetchingMediaCardSkeleton from "@/components/skeletons/DataFetchingMediaCardSkeleton";
const RenderSlider = dynamic(() => import("@/components/slider/RenderSlider"), {
  loading: () => (
    <div className="master-container mt-4 flex h-full w-full flex-col">
      <h2 className="font-header-3 flex items-baseline font-bold capitalize text-white ">
        Loading Category &nbsp; <AnimatedStringLoader loadingString="..." />
      </h2>
      <div className="mt-4 flex gap-x-2 overflow-hidden">
        {Array.from({ length: 8 }, (_, j) => (
          <DataFetchingMediaCardSkeleton key={j} />
        ))}
      </div>
    </div>
  ),
});

const CategoriesSlider = async () => {
  // fetch the data for the home page
  const homeData = await fetchAllDataForHome();

  return homeData.map((sliderData, index) => (
    <RenderSlider
      key={sliderData.title}
      sliderData={sliderData.data}
      sectionTitle={sliderData.title}
      listItemsPriority={sliderData.hasPriority}
      largeListItem={sliderData.standOut}
    />
  ));
};

export default CategoriesSlider;
