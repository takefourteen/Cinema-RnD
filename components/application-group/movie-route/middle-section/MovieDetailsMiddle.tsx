import RecommendedMovies from "@/components/application-group/movie-route/middle-section/RecommendedMovies";

type MovieDetailsMiddleProps = {
  movieId: string;
};

const MovieDetailsMiddle = ({ movieId }: MovieDetailsMiddleProps) => {
  return (
    <div className="master-container mt-8 first-line:mx-auto md:mt-8 lg:max-w-[80%]">
      {/* Heading */}
      <header className="mb-4  flex justify-between text-xl font-semibold tracking-wide md:mb-6 md:text-2xl">
        <h2 className="w-max border-l-4 border-l-red-700 ps-2 capitalize  text-white ">
          Movies You&apos;ll Love
          {/*
              - A Taste of Your Style
              - Curated Selection for You
              - A Taste of Your Style

            */}
        </h2>

        <h2 className="w-max  ps-2 capitalize  text-white/40">Details</h2>
      </header>
      <RecommendedMovies movieId={movieId} />
    </div>
  );
};

export default MovieDetailsMiddle;
