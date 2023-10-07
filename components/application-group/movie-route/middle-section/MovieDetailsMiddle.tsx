import { fetchSimilarMovies } from "@/lib/tmdb-api/similar";
import { fetchMovieRecommendations } from "@/lib/tmdb-api/recommendations";

import TabsNavigation from "./TabsNavigation";
import RecommendedMediaList from "@/components/application-group/recommendations/RecommendedMediaList";
import AboutTheMovie from "./AboutTheMovie";

type MovieDetailsMiddleProps = {
  mediaId: string;
};

const MovieDetailsMiddle = ({ mediaId }: MovieDetailsMiddleProps) => {
  const similarMoviesPromise: Promise<SimilarMovie[]> =
    fetchSimilarMovies(mediaId);
  const recommendedMoviesPromise: Promise<RecommendedMovie[]> =
    fetchMovieRecommendations(mediaId);

  return (
    <div className="master-container mx-auto mt-8 p-0 ">
      <TabsNavigation
        RecommendedMoviesComponent={
          <RecommendedMediaList mediaId={mediaId} mediaType={"movie"} />
        }
        AboutTheMovieComponent={<AboutTheMovie mediaId={mediaId} />}
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
