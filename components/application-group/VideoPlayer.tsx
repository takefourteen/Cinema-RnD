import { getVideoPlayerUrl } from "@/helpers/getVideoPlayerUrl";

import LoadingSpinner from "../skeletons/LoadingSpinner";

interface VideoPlayerProps {
  videoId: string;
  isTmdb: number | boolean; // 0 or 1, 0 is false, and 1 is true
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
      id="video-player"
      src={playerUrl}
      frameBorder="0"
      allowFullScreen
      className={className}
    />
  );
};

export default VideoPlayer;

/*
  https://multiembed.mov/?video_id=${videoId}
*/
