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
    <div className="master-container mt-8 mx-auto p-0 ">
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
master-container flex h-full flex-row items-end pb-12 md:items-center md:pb-0 lg:max-w-[80%] lg:justify-center lg:gap-x-8
            
*/
