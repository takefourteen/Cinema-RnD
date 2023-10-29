"use client";

import { Suspense } from "react";
import { useState } from "react";

import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";
import EpisodesListSkeleton from "@/components/skeletons/EpisodesListSkeleton";

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
  const [selectedSeason, setSelectedSeason] = useState<number>(
    selectedSeasonFromUrl || 1,
  );

  return (
    <div className="relative flex flex-col gap-y-8 md:gap-y-10">
      <SeasonSelect
        numberOfSeasons={totalNumberOfSeasons}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />

      <Suspense
        fallback={<EpisodesListSkeleton/>}
      >
        <EpisodesList tvSeriesId={tvSeriesId} selectedSeason={selectedSeason} />
      </Suspense>
    </div>
  );
};

export default SeasonsAndEpisodes;
