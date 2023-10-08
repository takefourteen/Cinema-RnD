import SeasonSelect from "./SeasonSelect";
import EpisodesList from "./EpisodesList";

type SeasonsAndEpisodesProps = {
  tvSeriesId: string;
};

const SeasonsAndEpisodes = ({
  tvSeriesId,
}: SeasonsAndEpisodesProps) => {
  // Todo: fetch season data - espesially the number of seasons

  return (
    <div>
      {/* <SeasonSelect /> */}
      <EpisodesList seasonNumber={1} tvSeriesId={tvSeriesId} />
    </div>
  );
};

export default SeasonsAndEpisodes;
