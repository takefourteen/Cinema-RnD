"use client";

import useSWR from "swr";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import EpisodeListItem from "./EpisodeListItem";
import AnimatedStringLoader from "@/components/AnimatedStringLoader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LoadingSpinner from "@/components/LoadingSpinner";

type EpisodesListProps = {
  tvSeriesId: string;
  selectedSeason: number;
};

const EpisodesList = ({ tvSeriesId, selectedSeason }: EpisodesListProps) => {
  const seasonNumber = selectedSeason.toString();
  const appendSeasonNumberToResponse = `season/${seasonNumber}`;

  const {
    data: tvSeriesDetails,
    error,
    isLoading,
  } = useSWR([tvSeriesId, 0, appendSeasonNumberToResponse], () =>
    fetchTvSeriesDetails(tvSeriesId, 0, appendSeasonNumberToResponse),
  );

  if (error) throw new Error("Failed to load tv data in EpisodesList.tsx");

  if (isLoading)
    return (
      <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="relative w-full ">
            <AspectRatio ratio={16 / 9}>
              <LoadingSpinner />
            </AspectRatio>
          </div>
        ))}
      </div>
    );

  if (!tvSeriesDetails) return null;

  return (
    <>
      {/* <p className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
        {seasonData.episodes.length} Episodes
      </p> */}

      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {(
          tvSeriesDetails[appendSeasonNumberToResponse] as SeasonData
        ).episodes.map((episode) => (
          <EpisodeListItem
            key={episode.id}
            episodeData={episode}
            tvSeriesId={tvSeriesId}
            tvSeriesTitle={tvSeriesDetails.original_name}
          />
        ))}
      </ul>
    </>
  );
};

export default EpisodesList;
