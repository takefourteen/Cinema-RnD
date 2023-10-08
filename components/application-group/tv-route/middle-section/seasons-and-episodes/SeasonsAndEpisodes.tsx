import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";

type SeasonsAndEpisodesProps = {
  tvSeriesId: string;
};

const SeasonsAndEpisodes = async ({ tvSeriesId }: SeasonsAndEpisodesProps) => {
  // Todo: fetch season data - espesially the number of seasons
  // and pass it to the SeasonSelect component
  const tvSeriesDetails = await fetchTvSeriesDetails(tvSeriesId);

  return (
    <div className="flex relative flex-col gap-y-4 lg:gap-y-8">
      <SeasonSelect numberOfSeasons={tvSeriesDetails.number_of_seasons} />
      <EpisodesList tvSeriesId={tvSeriesId} />
    </div>
  );
};

export default SeasonsAndEpisodes;
