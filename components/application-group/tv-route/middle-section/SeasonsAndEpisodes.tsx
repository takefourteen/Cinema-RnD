"use client";

import { Suspense } from "react";
import { useState } from "react";

import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";
import LoadingSpinner from "@/components/LoadingSpinner";

type SeasonsAndEpisodesProps = {
  tvSeriesId: string;
  totalNumberOfSeasons: number;
  selectedSeasonFromUrl?: number;
};

const SeasonsAndEpisodes = ({
  tvSeriesId,
  totalNumberOfSeasons,
  selectedSeasonFromUrl,
}: SeasonsAndEpisodesProps) => {

  const [selectedSeason, setSelectedSeason] = 
  useState<number>(selectedSeasonFromUrl || 1);

  return (
    <div className="relative flex flex-col gap-y-4 lg:gap-y-8">
      <SeasonSelect 
      numberOfSeasons={totalNumberOfSeasons} 
      selectedSeason={selectedSeason}
      setSelectedSeason={setSelectedSeason}
      />

      <Suspense fallback={<LoadingSpinner />}>
        <EpisodesList
         tvSeriesId={tvSeriesId} 
          selectedSeason={selectedSeason}
         />
      </Suspense>
    </div>
  );
};

export default SeasonsAndEpisodes;
