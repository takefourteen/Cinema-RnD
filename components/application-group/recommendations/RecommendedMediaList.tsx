import {
  fetchSimilarMovies,
  fetchSimilarTvSeries,
} from "@/lib/tmdb-api/similar";
import {
  fetchMovieRecommendations,
  fetchTVSeriesRecommendations,
} from "@/lib/tmdb-api/recommendations";
import { fetchShowsByGenre } from "@/helpers/fetchShowsByGenres";

import RecommendedMediaImage from "./RecommendedMediaImage";
import RecommendedMediaSkeleton from "@/components/skeletons/RecommendedMediaSkeleton";
import DataFetchingMediaCard from "@/components/cards/DataFetchingMediaCard";
import DataFetchingMediaCardSkeleton from "@/components/skeletons/DataFetchingMediaCardSkeleton";

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
  if (!similarMedia && !recommendedMedia)
    return <DataFetchingMediaCardSkeleton loader="skeleton" />;

  // if displayShowsByGenre is true, return showsByGenre
  if (displayShowsByGenre) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
        {showsByGenre.slice(0, 12).map((media) => (
          // <RecommendedMediaImage
          //   key={media.id}
          //   mediaId={media.id.toString()}
          //   mediaType={
          //     (media as DiscoverMovieResult).original_title ? "movie" : "tv"
          //   }
          // />
          <DataFetchingMediaCard
            key={media.id}
            loaderType="spinner"
            mediaId={media.id.toString()}
            mediaType={
              (media as DiscoverMovieResult).original_title ? "movie" : "tv"
            }
            priority={false}
            inAGrid={true}
            showTitle={true}
          />
        ))}
      </ul>
    );
  }

  // If recommendedMedia is undefined, return similarMedia
  if (!recommendedMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
        {similarMedia.slice(0, 12).map((media) => (
          <DataFetchingMediaCard
            key={media.id}
            loaderType="spinner"
            mediaId={media.id.toString()}
            mediaType={mediaType}
            priority={false}
            inAGrid={true}
            showTitle={true}
          />
        ))}
      </ul>
    );
  }

  // If similarMedia is undefined, return recommendedMedia
  if (!similarMedia) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
        {recommendedMedia.slice(0, 12).map((media) => (
          <li key={media.id}>
            <DataFetchingMediaCard
              loaderType="spinner"
              mediaId={media.id.toString()}
              mediaType={mediaType}
              priority={false}
              inAGrid={true}
              showTitle={true}
            />
          </li>
        ))}
      </ul>
    );
  }

  // If both similarMedia and recommendedMedia are defined, return both
  return (
    <ul className="grid  grid-cols-2  gap-x-4 gap-y-14 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6">
      {recommendedMedia.slice(0, 8).map((media) => (
        // <RecommendedMediaImage
        //   key={media.id}
        //   mediaId={media.id.toString()}
        //   mediaType={mediaType}
        // />
        <li key={media.id}>
          <DataFetchingMediaCard
            loaderType="spinner"
            mediaId={media.id.toString()}
            mediaType={mediaType}
            priority={false}
            inAGrid={true}
            showTitle={true}
          />
        </li>
      ))}
      {similarMedia.slice(0, 8).map((media) => (
        // <RecommendedMediaImage
        //   key={media.id}
        //   mediaId={media.id.toString()}
        //   mediaType={mediaType}
        // />
        <li key={media.id}>
          <DataFetchingMediaCard
            loaderType="spinner"
            mediaId={media.id.toString()}
            mediaType={mediaType}
            priority={false}
            inAGrid={true}
            showTitle={true}
          />
        </li>
      ))}
    </ul>
  );
};

export default RecommendedMediaList;
