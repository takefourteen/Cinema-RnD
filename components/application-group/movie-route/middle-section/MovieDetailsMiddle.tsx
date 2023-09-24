import { SimilarApiResponse, fetchSimilarMovies } from "@/lib/tmdb-api/similar";
import {
  RecommendationsApiResponse,
  fetchMovieRecommendations,
} from "@/lib/tmdb-api/recommendations";

import TabsNavigation from "./TabsNavigation";
import RecommendedMovies from "@/components/application-group/movie-route/middle-section/RecommendedMovies";
import AboutTheMovie from "./AboutTheMovie";

type MovieDetailsMiddleProps = {
  movieId: string;
};

const MovieDetailsMiddle = ({ movieId }: MovieDetailsMiddleProps) => {
  const similarMoviesPromise: Promise<SimilarApiResponse<SimilarMovie[]>> =
    fetchSimilarMovies(movieId);
  const recommendedMoviesPromise: Promise<
    RecommendationsApiResponse<RecommendedMovie[]>
  > = fetchMovieRecommendations(movieId);

  return (
    <div className="master-container mt-8 first-line:mx-auto md:mt-8 lg:max-w-[80%]">
      <TabsNavigation
        RecommendedMoviesComponent={<RecommendedMovies recommendedMoviesPromise={recommendedMoviesPromise} similarMoviesPromise={similarMoviesPromise}/>}
        AboutTheMovieComponent={<AboutTheMovie movieId={movieId} />}
      />
    </div>
  );
};

export default MovieDetailsMiddle;

/* 

              - A Taste of Your Style
              - Curated Selection for You
              - A Taste of Your Style

            
*/
