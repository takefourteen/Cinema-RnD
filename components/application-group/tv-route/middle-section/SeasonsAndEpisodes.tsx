"use client";

import { Suspense } from "react";
import { useState } from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";
import LoadingSpinner from "@/components/skeletons/LoadingSpinner";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

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
    <div className="relative flex flex-col gap-y-4 lg:gap-y-8">
      <SeasonSelect
        numberOfSeasons={totalNumberOfSeasons}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />

      <Suspense
        fallback={
          <div className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="relative w-full ">
                <AspectRatio ratio={16 / 9}>
                  <LoadingSpinner />
                </AspectRatio>
              </div>
            ))}
          </div>
        }
      >
        <EpisodesList tvSeriesId={tvSeriesId} selectedSeason={selectedSeason} />
      </Suspense>
    </div>
  );
};

export default SeasonsAndEpisodes;
