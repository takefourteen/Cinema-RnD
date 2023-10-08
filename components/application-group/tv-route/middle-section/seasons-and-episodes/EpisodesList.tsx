import { fetchSeasonData } from "@/lib/tmdb-api/season";

import Skeleton from "@/components/Skeleton";
import EpisodeListItem from "./EpisodeListItem";

type EpisodesListProps = {
  seasonNumber: number;
  tvSeriesId: string;
};

const EpisodesList = async ({
  seasonNumber,
  tvSeriesId,
}: EpisodesListProps) => {
  // Todo: fetch episode data for all episodes in the season
  const seasonData = await fetchSeasonData(tvSeriesId, seasonNumber);

  return (
    <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {seasonData.episodes.map((episode) => (
        <EpisodeListItem key={episode.id} episodeData={episode} />
      ))}
    </ul>
  );
};

export default EpisodesList;
