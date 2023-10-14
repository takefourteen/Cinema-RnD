import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

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

const page = async ({ params: { id } }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const movieId = id.split("-")[0];

  // fetch the movie details
  const movieDetails = await fetchMovieDetails(movieId);

  // log imdb id
  console.log("imdb id: ", movieDetails.imdb_id);

  const tabConfigs = [
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={movieId} mediaType="movie" />,
    },
    {
      key: "recommended",
      title: "More Like This",
      content: <RecommendedMediaList mediaId={movieId} mediaType="movie" />,
    },
  ];

  return (
    <section className=" text-white">
      {/* Top Section */}
      <div className="relative mt-[75px] h-[75dvh] flex-1 sm:h-[75dvh] lg:mt-[90px]">
        <Suspense>
          <VideoPlayer
            // videoId={movieId}
            videoId={movieDetails.imdb_id}
            isTmdb={false}
            season={0}
            episode={0}
            className="h-full w-full"
          />
        </Suspense>
      </div>
      {/* Middle Section */}
      <ExplorerPanel tabConfigs={tabConfigs} />

      {/* Script */}
      <Script src="../js/clearThePath.js" />
    </section>
  );
};

export default page;
