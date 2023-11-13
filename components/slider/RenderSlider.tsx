import dynamic from "next/dynamic";

import SectionHeader from "@/components/SectionHeader";
import DataFetchingMediaCardSkeleton from "../skeletons/DataFetchingMediaCardSkeleton";
import CarouselSkeleton from "../skeletons/CarouselSkeleton";

const DataFetchingMediaCard = dynamic(
  () => import("@/components/cards/DataFetchingMediaCard"),
  {
    loading: () => <DataFetchingMediaCardSkeleton loader="spinner" />,
    ssr: false,
  },
);

const Carousel = dynamic(() => import("../application-group/Carousel"), {
  loading: () => <CarouselSkeleton showTitle={false} />,
  ssr: false,
});

interface RenderSliderProps {
  sliderData: any[];
  sectionTitle: string;
  viewAllLink?: string;
  listItemsPriority?: boolean;
}

const RenderSlider = ({
  sliderData,
  sectionTitle,
  viewAllLink,
  listItemsPriority = false,
}: RenderSliderProps) => {
  return (
    <section className="master-container pt-[64px] lg:pt-[72px]">
      <SectionHeader
        sectionTitle={sectionTitle}
        viewAllLink={viewAllLink}
        showBorder={false}
      />

      <Carousel>
        {sliderData.map((item) => (
          <DataFetchingMediaCard
            key={item.id}
            mediaId={item.id}
            mediaType={item.original_name ? "tv" : "movie"}
            priority={listItemsPriority}
            imgSize={"default"}
            loaderType="spinner"
            style={{
              scrollSnapAlign: "start",
              scrollMargin: "0 10px",
            }}
          />
        ))}
      </Carousel>
    </section>
  );
};

export default RenderSlider;
