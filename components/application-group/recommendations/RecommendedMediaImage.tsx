import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { isTVSeriesDetails } from "@/lib/tmdb-api/tv-series";

import { AiFillStar } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Chip from "../Chip";
import ImageLoader from "@/components/ImageLoader";

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

type RecommendedMediaImageProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
};

/* 
Movie image component used in the MovieRecommendations component
gets the movie id, fetches the movie details and displays the movie image with a link to the movie page and some basic information about the movie
*/
const RecommendedMediaImage = async ({
  mediaId,
  mediaType,
}: RecommendedMediaImageProps) => {
  // fetch the media details based on the mediaType to by ensuring the result is of MovieDetailsData or TVSeriesData type
  const mediaDetails =
    mediaType === "movie"
      ? await fetchMovieDetails(mediaId)
      : await fetchTvSeriesDetails(mediaId);

  //   prepare url path for the media page by using type guard functions
  const moviePageUrl = `/${
    isMovieDetails(mediaDetails) ? "movie" : "tv"
  }/${mediaId}-${
    isMovieDetails(mediaDetails)
      ? mediaDetails?.original_title?.toLowerCase().split(" ").join("-")
      : mediaDetails?.original_name?.toLowerCase().split(" ").join("-")
  }`;

  // prepare img src url
  const imageSrc = `${imageBaseUrl}${mediaDetails?.backdrop_path}`;

  //   only show images that have a backdrop_path
  if (!mediaDetails?.backdrop_path) {
    return null;
  }

  // set title to original_title if it's a movie, original_name if it's a tv series
  const title = isMovieDetails(mediaDetails)
    ? mediaDetails.original_title
    : mediaDetails.original_name;

  // set date to release_date if it's a movie, first_air_date if it's a tv series
  const date = isMovieDetails(mediaDetails)
    ? mediaDetails.release_date
    : mediaDetails.first_air_date;

  // rating is a number between 0 and 10, round it to 1 decimal place
  mediaDetails.vote_average = Math.round(mediaDetails.vote_average * 10) / 10;

  //   only format the runtime for movies
  const runtime = isMovieDetails(mediaDetails)
    ? `${Math.floor(mediaDetails.runtime / 60)}h ${
        mediaDetails.runtime % 60 || "" // if the remainder is 0, don't show it
      }m`
    : null;

  // only get numberOfSeasons for tv series
  const numberOfSeasons = isTVSeriesDetails(mediaDetails)
    ? mediaDetails.number_of_seasons
    : null;

  return (
    <li className="relative h-auto flex-1">
      <Link href={moviePageUrl} className="group rounded-md">
        <MediaImage
          id={mediaDetails.id}
          imagePath={imageSrc}
          title={title}
          rating={mediaDetails.vote_average}
          date={date}
          runtime={runtime}
          numberOfSeasons={numberOfSeasons}
        />
      </Link>
    </li>
  );
};

// image displayed in the MediaRecommendations component
type MediaImage = {
  id: number;
  imagePath: string;
  title: string;
  rating: number;
  date: string;
  runtime?: string | null;
  numberOfSeasons?: number | null;
};

const MediaImage = ({
  id,
  imagePath,
  title,
  rating,
  date,
  runtime,
  numberOfSeasons,
}: MediaImage) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <ImageLoader
        loaderType="skeleton"
        src={imagePath}
        alt={`${title} poster`}
        fill
        priority
        className="rounded-md object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 25vw"
        style={{ filter: "brightness(0.8)" }}
      />

      {/* overlay the image with a grain texture */}
      {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

      {/* overlay the image with some info */}
      <div className="absolute inset-0 flex flex-col justify-between p-2">
        {/* the movie rating and release date as Chip components*/}
        <div className="flex flex-wrap gap-1">
          <Chip border={false}>
            <span className="flex items-center">
              <AiFillStar className="mr-1 inline-block" />
              {rating}
            </span>
          </Chip>
          <Chip border={false}>{new Date(date).getFullYear()}</Chip>
        </div>

        {/* the movie title and runtime */}
        <div className="flex flex-col">
          <h3 className="ml-1 truncate text-base font-semibold text-white group-hover:underline group-focus-visible:underline xl:text-lg">
            {title}
          </h3>
          <p className="ml-1 text-sm text-white/80 xl:text-base">
            {runtime ? runtime : `${numberOfSeasons} Seasons`}
          </p>
        </div>
      </div>
    </AspectRatio>
  );
};

export default RecommendedMediaImage;