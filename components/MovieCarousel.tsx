import { getPopularMovies } from "@/lib/tmdbApi";

import MovieCard from "./MovieCard";

const MovieCarousel = async () => {
  const popularMovies = (await getPopularMovies()) as PopularMovie[];

  return (
    <div className="flex gap-x-1 gap-y-4 overflow-hidden px-16">
      {/* loop and display */}
      {popularMovies.slice(0, 40).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieCarousel;
