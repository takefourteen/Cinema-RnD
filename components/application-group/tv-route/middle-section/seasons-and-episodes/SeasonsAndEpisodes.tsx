import { Suspense } from "react";

import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";
import LoadingSpinner from "@/components/LoadingSpinner";

type SeasonsAndEpisodesProps = {
  tvSeriesId: string;
};

const SeasonsAndEpisodes = async ({ tvSeriesId }: SeasonsAndEpisodesProps) => {
  // Todo: fetch season data - espesially the number of seasons
  // and pass it to the SeasonSelect component
  const tvSeriesDetails = await fetchTvSeriesDetails(tvSeriesId);

  return (
    <div className="relative flex flex-col gap-y-4 lg:gap-y-8">
      <SeasonSelect numberOfSeasons={tvSeriesDetails.number_of_seasons} />

      <Suspense fallback={<LoadingSpinner />}>
        <EpisodesList tvSeriesId={tvSeriesId} />
      </Suspense>
    </div>
  );
};

export default SeasonsAndEpisodes;
