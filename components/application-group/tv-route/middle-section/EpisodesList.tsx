"use client";

import useSWR from "swr";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { calculateDaysFromToday } from "@/helpers/calculateDaysFromToday";

import EpisodeListItem from "./EpisodeListItem";
import AnimatedStringLoader from "@/components/loadingStateComponents/AnimatedStringLoader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import LoadingSpinner from "@/components/loadingStateComponents/LoadingSpinner";

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
      <div className="grid  gap-x-4  gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
          <span className="flex">
            <AnimatedStringLoader loadingString="..." /> &nbsp; Episodes
          </span>
        </div>

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

  /* 
    display number of episodes in the season.
    go through each episode in the season and check if the episode
    air date is less than or equal to today's date. If it is, then
    increment the counter by 1.
  */
  const seasonData = tvSeriesDetails[
    appendSeasonNumberToResponse
  ] as SeasonData;
  const numberOfEpisodes = seasonData.episodes.filter(
    (episode) => calculateDaysFromToday(episode.air_date) <= 0,
  ).length;

  return (
    <>
      <p className="font-body-text absolute right-0 top-2 font-bold lg:top-4">
        {numberOfEpisodes} Episodes
      </p>

      <ul className="mt-4 grid gap-x-4  gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
