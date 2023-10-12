import {
  fetchSimilarMovies,
  fetchSimilarTvSeries,
} from "@/lib/tmdb-api/similar";
import {
  fetchMovieRecommendations,
  fetchTVSeriesRecommendations,
} from "@/lib/tmdb-api/recommendations";

import Skeleton from "@/components/Skeleton";
import RecommendedMediaImage from "./RecommendedMediaImage";

type RecommendedMediaListProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
};

const RecommendedMediaList = async ({
  mediaId,
  mediaType,
}: RecommendedMediaListProps) => {
  // fetch the movie or tv show details
  let similarMedia: SimilarMovie[] | SimilarTvSeries[] = [];
  let recommendedMedia: RecommendedMovie[] | RecommendedTvSeries[] = [];

  if (mediaType === "movie") {
    [similarMedia, recommendedMedia] = await Promise.all([
      fetchSimilarMovies(mediaId),
      fetchMovieRecommendations(mediaId),
    ]);
  } else if (mediaType === "tv") {
    [similarMedia, recommendedMedia] = await Promise.all([
      fetchSimilarTvSeries(mediaId),
      fetchTVSeriesRecommendations(mediaId),
    ]);
  }

  // If both similarMedia and recommendedMovies are not there , return a loading state
  if (!similarMedia && !recommendedMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={0} mainItemHeight={"100px"} />
        ))}
      </ul>
    );
  }

  // If recommendedMedia is undefined, return similarMedia
  if (!recommendedMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {similarMedia.slice(0, 12).map((media) => (
          <RecommendedMediaImage
            key={media.id}
            mediaId={media.id.toString()}
            mediaType={mediaType}
          />
        ))}
      </ul>
    );
  }

  // If similarMedia is undefined, return recommendedMedia
  if (!similarMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {recommendedMedia.slice(0, 12).map((media) => (
          <RecommendedMediaImage
            key={media.id}
            mediaId={media.id.toString()}
            mediaType={mediaType}
          />
        ))}
      </ul>
    );
  }

  // If both similarMedia and recommendedMedia are defined, return both
  return (
    <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {recommendedMedia.slice(0, 8).map((media) => (
        <RecommendedMediaImage
          key={media.id}
          mediaId={media.id.toString()}
          mediaType={mediaType}
        />
      ))}
      {similarMedia.slice(0, 8).map((media) => (
        <RecommendedMediaImage
          key={media.id}
          mediaId={media.id.toString()}
          mediaType={mediaType}
        />
      ))}
    </ul>
  );
};

export default RecommendedMediaList;
