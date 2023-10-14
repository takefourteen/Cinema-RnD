import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchTvSeriesExternalIds } from "@/lib/tmdb-api/external-ids";

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
  // searchParams will be something like this: ?season=1&episode=2
  searchParams: {
    season: string;
    episode: string;
  };
};

const page = async ({ params, searchParams }: PageProps) => {
  //  id from the params is a string with the movie id and the movie name seperated by a dash, so we split the string and get the id
  const tvSeriesId = params.id.split("-").pop() as string;
  const season = searchParams.season;
  const episode = searchParams.episode;

  // fetch external ids - imdb id & fetch the tv series details
  const externalIdsPromise = fetchTvSeriesExternalIds(tvSeriesId);
  const tvSeriesDetailsPromise = fetchTvSeriesDetails(tvSeriesId, 0, false);

  const [externalIds, tvSeriesDetails] = await Promise.all([
    externalIdsPromise,
    tvSeriesDetailsPromise,
  ]);

  console.log("\ntmdb id: ", tvSeriesId);
  console.log("season: ", season);
  console.log("episode: ", episode);
  console.log("imdb id: ", externalIds.imdb_id);

  const tabConfigs = [
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={tvSeriesId} mediaType="tv" />,
    },
    {
      key: "recommended",
      title: "More Like This",
      content: <RecommendedMediaList mediaId={tvSeriesId} mediaType="tv" />,
    },
  ];

  return (
    <section className=" text-white">
      {/* Top Section */}
      <div className="relative mt-[75px] h-[75dvh] flex-1 sm:h-[75dvh] lg:mt-[90px]">
        <Suspense>
          <VideoPlayer
            // videoId={movieId}
            videoId={
              externalIds.imdb_id
                ? externalIds.imdb_id
                : tvSeriesDetails.id.toString()
            }
            isTmdb={
              externalIds.imdb_id
                ? false
                : tvSeriesDetails.id.toString().startsWith("tt")
            }
            season={Number(season)}
            episode={Number(episode)}
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
