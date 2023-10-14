"use client";

import useSWR from "swr";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import Skeleton from "@/components/Skeleton";
import EpisodeListItem from "./EpisodeListItem";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import AnimatedStringLoader from "@/components/AnimatedStringLoader";

type EpisodesListProps = {
  tvSeriesId: string;
  selectedSeason: number;
};

const EpisodesList = ({ tvSeriesId, selectedSeason }: EpisodesListProps) => {
  const seasonNumber = selectedSeason.toString();
  const appendSeasonNumberToResponse = `season/${seasonNumber}`;
  const {
    data: seasonData,
    error,
    isLoading,
  } = useSWR([tvSeriesId, seasonNumber], () =>
    fetchTvSeriesDetails(tvSeriesId, 0, appendSeasonNumberToResponse),
  );

  // if there is an error, throw it
  if (error) throw error;

  // if there is no data, map over an array of 4 items
  // and return a skeleton
  if (!seasonData)
    return (
      <>
        {/* <p className="font-body-text absolute right-0 top-2 flex gap-0.5 font-bold lg:top-4">
          <AnimatedStringLoader loadingString="..." />
          Episodes
        </p> */}

        <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative w-full ">
              <AspectRatio ratio={16 / 9}>
                <Skeleton rows={2} />
              </AspectRatio>
            </div>
          ))}
        </div>
      </>
    );

  // if the data is loading, map over an array of 4 items
  // and return a skeleton
  if (isLoading)
    return (
      <>
        <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="relative w-full ">
              <AspectRatio ratio={16 / 9}>
                <Skeleton rows={2} />
              </AspectRatio>
            </div>
          ))}
        </div>
      </>
    );

  return (
    <>
      {/* <p className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
        {seasonData.episodes.length} Episodes
      </p> */}

      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {(seasonData[appendSeasonNumberToResponse] as SeasonData).episodes.map(
          (episode) => (
            <EpisodeListItem
              key={episode.id}
              episodeData={episode}
              tvSeriesId={tvSeriesId}
              tvSeriesTitle={seasonData.original_name}
            />
          ),
        )}
      </ul>
    </>
  );
};

export default EpisodesList;
