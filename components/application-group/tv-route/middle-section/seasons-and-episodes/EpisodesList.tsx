"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";

import { fetchSeasonData } from "@/lib/tmdb-api/season";

import Skeleton from "@/components/Skeleton";
import EpisodeListItem from "./EpisodeListItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AnimatedStringLoader from "@/components/AnimatedStringLoader";

type EpisodesListProps = {
  tvSeriesId: string;
};

const EpisodesList = ({ tvSeriesId }: EpisodesListProps) => {
  const searchParams = useSearchParams();
  const seasonNumber = searchParams.get("season") || "1";
  console.log("season: ", searchParams.get("season"));
  const {
    data: seasonData,
    error,
    isLoading,
  } = useSWR([tvSeriesId, seasonNumber], () =>
    fetchSeasonData(tvSeriesId, parseInt(seasonNumber, 10)),
  );

  // if there is an error, throw it
  if (error) throw error;

  // if there is no data, map over an array of 10 items
  // and return a skeleton
  if (!seasonData)
    return (
      <>
        <p className="font-body-text absolute right-0 top-2 flex gap-0.5 font-bold lg:top-4">
          <AnimatedStringLoader loadingString="..." />
          Episodes
        </p>

        <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="relative w-full ">
              <AspectRatio ratio={16 / 9}>
                <Skeleton />
              </AspectRatio>
            </div>
          ))}
        </div>
      </>
    );

  // if the data is loading, map over an array of 10 items
  // and return a skeleton
  if (isLoading)
    return (
      <>
        <p className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
          {seasonData.episodes.length} Episodes
        </p>

        <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="relative w-full ">
              <AspectRatio ratio={16 / 9}>
                <Skeleton />
              </AspectRatio>
            </div>
          ))}
        </div>
      </>
    );

  return (
    <>
      <p className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
        {seasonData.episodes.length} Episodes
      </p>

      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {seasonData.episodes.map((episode) => (
          <EpisodeListItem key={episode.id} episodeData={episode} />
        ))}
      </ul>
    </>
  );
};

export default EpisodesList;
