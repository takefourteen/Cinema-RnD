import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

import Skeleton from "@/components/Skeleton";
import RecommendedMovieImage from "./RecommendedMovieImage";

type RecommendedMoviesListProps = {
  recommendedMoviesPromise: Promise<RecommendedMovie[]>;
  similarMoviesPromise: Promise<SimilarMovie[]>;
};

const RecommendedMoviesList = async ({
  recommendedMoviesPromise,
  similarMoviesPromise,
}: RecommendedMoviesListProps) => {
  // use promise.all to fetch similarMovies and recommendedMovies at the same time
  const [similarMovies, recommendedMovies] = await Promise.all([
    similarMoviesPromise,
    recommendedMoviesPromise,
  ]);

  // =========================================
  // Filter out movies that are not in english
  // =========================================
  const filteredSimilarMovies = filterResultsByLanguage(
    similarMovies || [],
    "en",
  );
  const filteredRecommendedMovies = filterResultsByLanguage(
    recommendedMovies || [],
    "en",
  );

  // If both similarMovies and recommendedMovies are undefined, return a loading state
  if (!similarMovies && !recommendedMovies) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={0} mainItemHeight={100} />
        ))}
      </ul>
    );
  }

  // If recommendedMovies is undefined, return similarMovies
  if (!recommendedMovies) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {filteredSimilarMovies.slice(0, 12).map((similarMovie) => (
          <RecommendedMovieImage
            key={similarMovie.id}
            movieId={similarMovie.id.toString()}
          />
        ))}
      </ul>
    );
  }

  // If similarMovies is undefined, return recommendedMovies
  if (!similarMovies) {
    return (
      <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {filteredRecommendedMovies.slice(0, 12).map((recommendedMovie) => (
          <RecommendedMovieImage
            key={recommendedMovie.id}
            movieId={recommendedMovie.id.toString()}
          />
        ))}
      </ul>
    );
  }

  // If both similarMovies and recommendedMovies are defined, return both
  return (
    <ul className="grid  grid-cols-2  gap-x-4 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
      {filteredRecommendedMovies.slice(0, 8).map((recommendedMovie) => (
        <RecommendedMovieImage
          key={recommendedMovie.id}
          movieId={recommendedMovie.id.toString()}
        />
      ))}
      {filteredSimilarMovies.slice(0, 8).map((similarMovie) => (
        <RecommendedMovieImage
          key={similarMovie.id}
          movieId={similarMovie.id.toString()}
        />
      ))}
    </ul>
  );
};

export default RecommendedMoviesList;
