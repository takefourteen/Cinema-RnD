"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

import SectionHeader from "@/components/SectionHeader";
import DataFetchingMediaCardSkeleton from "../skeletons/DataFetchingMediaCardSkeleton";
import Carousel from "../application-group/Carousel";
// import DataFetchingMediaCard from "../cards/DataFetchingMediaCard";

const DataFetchingMediaCard = dynamic(
  () => import("@/components/cards/DataFetchingMediaCard"),
  {
    loading: () => <DataFetchingMediaCardSkeleton />,
    ssr: false,
  },
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 50px 0px",
  });

  return (
    <section className="master-container pt-[64px] lg:pt-[72px]" ref={ref}>
      {inView && (
        <>
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
                loaderType="skeleton"
                style={{
                  scrollSnapAlign: "start",
                  scrollMargin: "0 10px",
                }}
              />
            ))}
          </Carousel>
        </>
      )}
    </section>
  );
};

export default RenderSlider;
