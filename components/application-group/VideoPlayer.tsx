import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";

import LoadingSpinner from "../LoadingSpinner";

interface VideoPlayerProps {
  videoId: string;
  isTmdb: number;
  season: number;
  episode: number;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = async ({
  videoId,
  isTmdb,
  season,
  episode,
  className,
}) => {
  // fetch the video player url
  const playerUrl = await getVideoPlayerUrl(videoId, isTmdb, season, episode);

  // if the player url is not ready yet, show a loading spinner
  if (!playerUrl) {
    return <LoadingSpinner />;
  }

  return (
    <iframe
      src={playerUrl}
      frameBorder="0"
      allowFullScreen
      className={className}
    />
  );
};

export default VideoPlayer;
