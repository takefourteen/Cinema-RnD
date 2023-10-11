"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { isTVSeriesDetails } from "@/lib/tmdb-api/tv-series";

import { AiFillStar } from "react-icons/ai";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Chip from "../application-group/Chip";
import ImageLoader from "@/components/ImageLoader";
import LoadingSpinner from "../LoadingSpinner";
import MediaImageWithInfo from "@/components/slider-v-3.0/MediaImageWithInfo";

type HorizontalMotionMediaCardProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
  priority: boolean;
};

const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

const HorizontalMotionMediaCard = ({
  mediaId,
  mediaType,
  priority,
}: HorizontalMotionMediaCardProps) => {
  // Define the fetcher function based on the mediaType
  const fetcher: () => Promise<MovieDetailsData | TVSeriesData> =
    mediaType === "movie"
      ? () => fetchMovieDetails(mediaId)
      : () => fetchTvSeriesDetails(mediaId);

  // Fetch the media details based on the mediaType
  const { data: mediaDetails, error, isLoading } = useSWR(mediaId, fetcher);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  // if data is undefined, return null
  if (!mediaDetails) {
    return null;
  }

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

  //   only show images that have a backdrop_path
  if (!mediaDetails?.backdrop_path) {
    return null;
  }

  return (
    <motion.li
      className="relative h-auto min-w-[150px] sm:min-w-[175px] md:min-w-[200px] lg:min-w-[250px] xl:min-w-[300px] flex-1 "
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.4,
        },
      }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 100,
      }}
    >
      <Link href={moviePageUrl} className="group ">
        <MediaImageWithInfo
          id={mediaDetails.id}
          imagePath={imageSrc}
          title={title}
          rating={mediaDetails.vote_average}
          date={date}
          runtime={runtime}
          numberOfSeasons={numberOfSeasons}
          showRatingAndYear={false}
          priority={priority}
        />
      </Link>
    </motion.li>
  );
};


export default HorizontalMotionMediaCard;
