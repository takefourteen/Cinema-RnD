import {
  fetchSimilarMovies,
  fetchSimilarTvSeries,
} from "@/lib/tmdb-api/similar";
import {
  fetchMovieRecommendations,
  fetchTVSeriesRecommendations,
} from "@/lib/tmdb-api/recommendations";
import { fetchShowsByGenre } from "@/helpers/fetchShowsByGenres";

import Skeleton from "@/components/skeletons/Skeleton";
import RecommendedMediaImage from "./RecommendedMediaImage";

type RecommendedMediaListProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
  genreIds: number[];
};

const RecommendedMediaList = async ({
  mediaId,
  mediaType,
  genreIds,
}: RecommendedMediaListProps) => {
  let similarMedia: SimilarMovie[] | SimilarTvSeries[] = [];
  let recommendedMedia: RecommendedMovie[] | RecommendedTvSeries[] = [];
  let showsByGenre: DiscoverMovieResult[] | DiscoverTVSeriesResult[] = [];

  if (mediaType === "movie") {
    [similarMedia, recommendedMedia, showsByGenre] = await Promise.all([
      fetchSimilarMovies(mediaId),
      fetchMovieRecommendations(mediaId),
      fetchShowsByGenre(genreIds, "movies"),
    ]);
  } else if (mediaType === "tv") {
    [similarMedia, recommendedMedia, showsByGenre] = await Promise.all([
      fetchSimilarTvSeries(mediaId),
      fetchTVSeriesRecommendations(mediaId),
      fetchShowsByGenre(genreIds, "tv"),
    ]);
  }

  /*
   set display showsByGenre to true if there are less than 8 similarMedia 
   and recommendedMedia combined  
   */
  const displayShowsByGenre = similarMedia.length + recommendedMedia.length < 8;

  // If both similarMedia and recommendedMovies are not there , return a loading state
  if (!similarMedia && !recommendedMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <li key={i}>
            <Skeleton rows={0} mainItemHeight={"100px"} />
          </li>
        ))}
      </ul>
    );
  }

  // if displayShowsByGenre is true, return showsByGenre
  if (displayShowsByGenre) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {showsByGenre.slice(0, 12).map((media) => (
          <RecommendedMediaImage
            key={media.id}
            mediaId={media.id.toString()}
            mediaType={
              (media as DiscoverMovieResult).original_title ? "movie" : "tv"
            }
          />
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
