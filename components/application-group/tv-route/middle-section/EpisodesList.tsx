import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";

import EpisodeListItem from "./EpisodeListItem";
import AnimatedStringLoader from "@/components/AnimatedStringLoader";

type EpisodesListProps = {
  tvSeriesId: string;
  selectedSeason: number;
};

const EpisodesList = async ({
  tvSeriesId,
  selectedSeason,
}: EpisodesListProps) => {
  const seasonNumber = selectedSeason.toString();
  const appendSeasonNumberToResponse = `season/${seasonNumber}`;

  const tvSeriesDetails = await fetchTvSeriesDetails(
    tvSeriesId,
    0,
    appendSeasonNumberToResponse,
  );

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
