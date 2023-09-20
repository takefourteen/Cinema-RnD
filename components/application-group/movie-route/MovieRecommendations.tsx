import React from "react";

import { fetchMovieRecommendations } from "@/lib/tmdb-api/recommendations";
import { fetchSimilarMovies } from "@/lib/tmdb-api/similar";

import Skeleton from "@/components/Skeleton";

type MovieRecommendationsProps = {
  movieId: string;
};

const MovieRecommendations = async ({ movieId }: MovieRecommendationsProps) => {
  const { data: recommendedMovies, error } =
    await fetchMovieRecommendations(movieId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (recommendedMovies?.length === 0) {
    // Display a neat grid of skeletons while data is loading
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={2} />
        ))}
      </div>
    );
  }

  return (
    <section className="master-container pt-[70px] md:pt-0">
      {/*  quick test -  Display the title of the movie recommendations */}
      {recommendedMovies
        ?.slice(0, 12)
        .map((movie) => <div key={movie.id}>{movie.original_title}</div>)}
    </section>
  );
};

export default MovieRecommendations;

const SkeletonGrid: React.FC<{ rows: number; columns: number }> = ({
  rows,
  columns,
}) => {
  const skeletonItems = [];

  for (let i = 0; i < rows * columns; i++) {
    skeletonItems.push(<Skeleton rows={i} key={i} />);
  }

  return <div className="grid grid-cols-4 gap-4">{skeletonItems}</div>;
};
