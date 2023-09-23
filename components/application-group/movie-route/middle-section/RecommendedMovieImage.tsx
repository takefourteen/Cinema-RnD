import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";

import { AiFillStar } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageWithLoader from "./ImageWithLoader";
import Chip from "../Chip";

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

  // rating is a number between 0 and 10, round it to 1 decimal place
  movieDetails.vote_average = Math.round(movieDetails.vote_average * 10) / 10;

  //   change the time format from minutes to hours and minutes
  const runtime = `${Math.floor(movieDetails.runtime / 60)}h ${
    movieDetails.runtime % 60 || "" // if the remainder is 0, don't show it
  }m`;

  return (
    <li className="relative h-auto flex-1">
      <Link href={moviePageUrl} className="group rounded-md">
        <AspectRatio ratio={16 / 9}>
          <ImageWithLoader src={imageSrc} alt={movieDetails?.original_title} />

          {/* overlay the image with a grain texture */}
          <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" />

          {/* overlay the image with some info */}
          <div className="absolute inset-0 flex flex-col justify-between p-2">
            {/* the movie rating and release date as Chip components*/}
            <div className="flex flex-wrap">
              <Chip>
                <span className="flex items-center">
                  <AiFillStar className="mr-1 inline-block" />
                  {movieDetails.vote_average}
                </span>
              </Chip>
              <Chip>{new Date(movieDetails.release_date).getFullYear()}</Chip>
            </div>

            {/* the movie title and runtime */}
            <div className="flex flex-col">
              <h3 className="ml-1 truncate text-base font-semibold text-white group-hover:underline group-focus-visible:underline xl:text-lg">
                {movieDetails.original_title}
              </h3>
              <p className="ml-1 text-sm text-white/80 xl:text-base">
                {runtime}
              </p>
            </div>
          </div>
        </AspectRatio>
      </Link>
    </li>
  );
};

export default RecommendedMovieImage;
