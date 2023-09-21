import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageWithLoader from "./ImageWithLoader";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

/* 
Movie image component used in the MovieRecommendations component
gets the movie id, fetches the movie details and displays the movie image with a link to the movie page and some basic information about the movie
*/
const RecommendedMovieImage = async ({ movieId }: { movieId: string }) => {
  const { data: movieDetails, error } = await fetchMovieDetails(movieId);

  //   prepare url path for the movie details page, the structure is /movie/:id-nameofmovie, the name is seperated by a dash
  const moviePageUrl = `/movie/${movieId}-${movieDetails?.original_title
    .split(" ")
    .join("-")}`;

  // prepare img src url
  const imageSrc = `${imageBaseUrl}${movieDetails?.backdrop_path}`;

  //   only show images that have a backdrop_path
  if (!movieDetails?.backdrop_path) {
    return null;
  }

  return (
    <li className="relative h-auto flex-1">
      <Link href={moviePageUrl} className="group rounded-md">
        <AspectRatio ratio={16 / 9}>
          <ImageWithLoader src={imageSrc} alt={movieDetails?.original_title} />

          {/* overlay the image with a grain texture */}
          <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" />
        </AspectRatio>
      </Link>
    </li>
  );
};

export default RecommendedMovieImage;
