import Link from "next/link";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { isTVSeriesDetails } from "@/lib/tmdb-api/tv-series";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import DetailsOnMediaCard from "@/components/application-group/DetailsOnMediaCard";
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
    ? mediaDetails.runtime >= 60
      ? `${Math.floor(mediaDetails.runtime / 60)}h ${
          mediaDetails.runtime % 60 || "" // if the remainder is 0, don't show it
        }m`
      : `${mediaDetails.runtime}m`
    : null;

  // only get numberOfSeasons for tv series
  const numberOfSeasons = isTVSeriesDetails(mediaDetails)
    ? mediaDetails.number_of_seasons
    : null;

  return (
    <li className="relative h-auto flex-1">
      <Link href={moviePageUrl} className="group rounded-md">
        <AspectRatio ratio={16 / 9}>
          <ImageLoader
            loaderType="skeleton"
            src={imageSrc}
            alt={`${title} poster`}
            fill
            sizes=" (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 25vw"
            priority={false}
            className="object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
            style={{ filter: "brightness(0.9)" }}
          />

          {/* overlay the image with a grain texture */}
          {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

          {/* small dark overlay over the top and bottom of img to make the info readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* overlay the image with some info */}

          <DetailsOnMediaCard
            title={title}
            rating={mediaDetails.vote_average}
            date={date}
            runtime={runtime}
            numberOfSeasons={numberOfSeasons}
            showRatingAndYear={true}
          />
        </AspectRatio>
      </Link>
    </li>
  );
};

export default RecommendedMediaImage;
