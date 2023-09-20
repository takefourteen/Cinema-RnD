import Image from "next/image";
import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import Skeleton from "@/components/Skeleton";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

/* 
Movie image component used in the MovieRecommendations component
gets the movie id, fetches the movie details and displays the movie image with a link to the movie page and some basic information about the movie
*/
const RecommendedMovieImage = async ({ movieId }: { movieId: string }) => {
  const { data: movieDetails, error } = await fetchMovieDetails(movieId);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-12  md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((_, i) => (
          <Skeleton key={i} rows={2} />
        ))}
      </div>
    );
  }
};

export default RecommendedMovieImage;
