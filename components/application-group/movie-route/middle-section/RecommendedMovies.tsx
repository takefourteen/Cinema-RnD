import { RecommendationsApiResponse } from "@/lib/tmdb-api/recommendations";
import { SimilarApiResponse } from "@/lib/tmdb-api/similar";

import { filterResultsByLanguage } from "@/lib/tmdb-api/filterResults";

import Skeleton from "@/components/Skeleton";
import RecommendedMovieImage from "./RecommendedMovieImage";

type RecommendedMoviesProps = {
  recommendedMoviesPromise: Promise<
    RecommendationsApiResponse<RecommendedMovie[]>
  >;
  similarMoviesPromise: Promise<SimilarApiResponse<SimilarMovie[]>>;
};

const RecommendedMovies = async ({
  recommendedMoviesPromise,
  similarMoviesPromise,
}: RecommendedMoviesProps) => {
  // use promise.all to fetch similarMovies and recommendedMovies at the same time
  const [similarMoviesResponse, recommendedMoviesResponse] = await Promise.all([
    similarMoviesPromise,
    recommendedMoviesPromise,
  ]);

  // destructure the data and error from the responses
  const { data: similarMovies, error: similarMoviesError } =
    similarMoviesResponse;
  const { data: recommendedMovies, error: recommendedMoviesError } =
    recommendedMoviesResponse;

  /*
    if there is an error fetching similarMovies and recommendedMovies, 
    throw an error that will be caught by the ErrorBoundary (error.tsx)
   */
  if (similarMoviesError && recommendedMoviesError) {
    throw new Error(
      `Error fetching similar movies and recommended movies: ${similarMoviesError} and ${recommendedMoviesError}`,
    );
  }

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

export default RecommendedMovies;
