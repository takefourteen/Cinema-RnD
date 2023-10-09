import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

import VideoPlayer from "@/components/application-group/VideoPlayer";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";

// lazy load the following components
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
);
const DetailsAboutShowSection = dynamic(
  () => import("@/components/application-group/DetailsAboutShowSection"),
);

type PageProps = {
  params: {
    id: string;
  };
};

const page = ({ params: { id } }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  const tabConfigs = [
    {
      key: "recommended",
      title: "More Like This",
      content: <RecommendedMediaList mediaId={movieId} mediaType="movie" />,
    },
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={movieId} mediaType="movie" />,
    },
  ];

  return (
    <section className=" text-white">
      {/* Top Section */}
      <div className="relative mt-[75px] h-[40rem] flex-1 sm:h-[42rem] md:h-[40rem] lg:mt-[90px]">
        <Suspense>
          <VideoPlayer
            videoId={movieId}
            isTmdb={1}
            season={0}
            episode={0}
            className="h-full w-full"
          />
        </Suspense>
      </div>
      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />;{/* Script */}
      <Script src="../js/clearThePath.js" />
    </section>
  );
};

export default page;
