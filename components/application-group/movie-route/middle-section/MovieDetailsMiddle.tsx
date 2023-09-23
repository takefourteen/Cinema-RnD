import TabsNavigation from "./TabsNavigation";
import RecommendedMovies from "@/components/application-group/movie-route/middle-section/RecommendedMovies";
import AboutTheMovie from "./AboutTheMovie";
import { Separator } from "@/components/ui/separator";

type MovieDetailsMiddleProps = {
  movieId: string;
};

const MovieDetailsMiddle = ({ movieId }: MovieDetailsMiddleProps) => {
  return (
    <div className="master-container mt-8 first-line:mx-auto md:mt-8 lg:max-w-[80%]">
      {/* Heading */}
      <header className=" hidden justify-between text-xl font-semibold tracking-wide md:mb-6 md:text-2xl">
        <h2 className="w-max border-b-4 border-b-red-700 ps-2 capitalize  text-white ">
          Movies You&apos;ll Love
        </h2>

        <h2 className="w-max  ps-2 capitalize  text-white/40">Details</h2>
      </header>

      <TabsNavigation
        RecommendedMoviesComponent={<RecommendedMovies movieId={movieId} />}
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
