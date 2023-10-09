import { Suspense } from "react";

import MovieDetailsTop from "@/components/application-group/movie-route/MovieDetailsTop";
import RecommendedMediaList from "@/components/application-group/recommendations/RecommendedMediaList";
import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";

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
      <Suspense>
        <MovieDetailsTop movieId={movieId} />
      </Suspense>
      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />;
    </section>
  );
};

export default page;
