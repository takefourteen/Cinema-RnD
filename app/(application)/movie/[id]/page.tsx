import { Suspense } from "react";
import dynamic from "next/dynamic";

import MovieDetailsTop from "@/components/application-group/movie-route/MovieDetailsTop";
// import RecommendedMediaList from "@/components/application-group/recommendations/RecommendedMediaList";
// import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
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

const page = ({ params }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = params.id.split("-").pop() as string;

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
      <Suspense>
        <MovieDetailsTop movieId={movieId} />
      </Suspense>
      {/* Middle Section */}

      <Suspense fallback={null}>
        <ExplorerPanel tabConfigs={tabConfigs} />
      </Suspense>
    </section>
  );
};

export default page;
