import { Suspense } from "react";
import dynamic from "next/dynamic";
import Script from "next/script";
import { notFound } from "next/navigation";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { fetchTvSeriesExternalIds } from "@/lib/tmdb-api/external-ids";

import VideoPlayer from "@/components/application-group/VideoPlayer";
import ExplorerPanel from "@/components/application-group/ExplorerPanel";
import DetailsAboutShowSection from "@/components/application-group/DetailsAboutShowSection";
import RecommendedMediaSkeleton from "@/components/skeletons/RecommendedMediaSkeleton";
import EpisodesListSkeleton from "@/components/skeletons/EpisodesListSkeleton";

// lazy load the following components:
const RecommendedMediaList = dynamic(
  () =>
    import(
      "@/components/application-group/recommendations/RecommendedMediaList"
    ),
  {
    loading: () => <RecommendedMediaSkeleton />,
  },
);

const SeasonsAndEpisodes = dynamic(
  () =>
    import(
      "@/components/application-group/tv-route/middle-section/SeasonsAndEpisodes"
    ),

  {
    loading: () => <EpisodesListSkeleton />,
  },
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

  // if there is no season, episode or id in the url, redirect to the not found page
  if (!searchParams.season || !searchParams.episode || !tvSeriesId) {
    return notFound();
  }

  // fetch external ids - imdb id & fetch the tv series details
  let externalIds;
  let tvSeriesDetails;
  try {
    externalIds = await fetchTvSeriesExternalIds(tvSeriesId);
    tvSeriesDetails = await fetchTvSeriesDetails(tvSeriesId, 0, "credits");
  } catch (error) {
    console.error("error: ", error);
    return notFound();
  }

  console.log("imdb id: ", externalIds.imdb_id);

  // structure genreIds as an array of numbers
  const genreIds = tvSeriesDetails.genres.map((genre) => genre.id);

  const tabConfigs = [
    {
      key: "episodes",
      title: "Episodes",
      content: (
        <SeasonsAndEpisodes
          tvSeriesId={tvSeriesId}
          totalNumberOfSeasons={tvSeriesDetails.number_of_seasons}
          selectedSeasonFromUrl={Number(season)}
        />
      ),
    },
    {
      key: "recommended",
      title: "Similar",
      content: (
        <RecommendedMediaList
          mediaId={tvSeriesId}
          mediaType="tv"
          genreIds={genreIds}
        />
      ),
    },
    {
      key: "details",
      title: "Details",
      content: <DetailsAboutShowSection mediaId={tvSeriesId} mediaType="tv" />,
    },
  ];

  return (
    <section>
      {/* Top Section */}
      <div className="relative h-[75dvh] flex-1 sm:h-[75dvh]">
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
            className="h-full w-full pt-[75px] lg:pt-[90px] "
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
