"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import useSWR from "swr";

import { fetchMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchTvSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { isTVSeriesDetails } from "@/lib/tmdb-api/tv-series";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLoader from "@/components/ImageLoader";
import DetailsOnMediaCard from "../application-group/DetailsOnMediaCard";
import Skeleton from "../Skeleton";

type HorizontalMotionMediaCardProps = {
  mediaId: string;
  mediaType: "movie" | "tv";
  priority: boolean;
  imgSize?: "default" | "large";
};

const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

const listItemSize = {
  default: {
    width:
      "min-w-[225px] sm:min-w-[275px] md:min-w-[325px] lg:min-w-[325px] xl:min-w-[375px] ",
    sizes:
      "(max-width: 640px) 225px, (max-width: 768px) 275px, (max-width: 1024px) 325px, (max-width: 1280px) 375px",
  },

  large: {
    width: "min-w-[375px] md:min-w-[425px] lg:min-w-[475px] xl:min-w-[500px] ",
    sizes:
      "(max-width: 640px) 375px, (max-width: 768px) 425px, (max-width: 1024px) 475px, (max-width: 1280px) 500px",
  },
};

const HorizontalMotionMediaCard = ({
  mediaId,
  mediaType,
  priority,
  imgSize = "default",
}: HorizontalMotionMediaCardProps) => {
  // Define the fetcher function based on the mediaType
  const fetcherWithDelay: () => Promise<
    MovieDetailsData | TVSeriesData
  > = async () => {
    return new Promise((resolve) => {
      setTimeout(async () => {
        if (mediaType === "movie") {
          resolve(await fetchMovieDetails(mediaId));
        } else if (mediaType === "tv") {
          resolve(await fetchTvSeriesDetails(mediaId));
        }
      }, 100); // Adjust the delay time (in milliseconds) as needed
    });
  };

  // Fetch the media details based on the mediaType
  const {
    data: mediaDetails,
    error,
    isLoading,
  } = useSWR(mediaId, fetcherWithDelay);

  if (isLoading) {
    return (
      <div className={`relative h-auto flex-1  ${listItemSize[imgSize].width}`}>
        <AspectRatio ratio={3 / 2}>
          <Skeleton rows={0} showOverlay={false} />
        </AspectRatio>
      </div>
    );
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

  //   only show images that have a backdrop_path
  if (!mediaDetails?.backdrop_path) {
    return null;
  }

  return (
    <motion.li
      className={`relative h-auto flex-1  ${listItemSize[imgSize].width}`}
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
        <AspectRatio ratio={3 / 2}>
          <ImageLoader
            loaderType="skeleton"
            src={imageSrc}
            alt={`${title} poster`}
            fill
            sizes={listItemSize[imgSize].sizes}
            priority={priority}
            className=" object-cover transition-all duration-300 ease-in-out group-hover:ring-4 group-hover:ring-slate-950 group-hover:ring-offset-2 group-focus-visible:ring-4  group-focus-visible:ring-slate-950 group-focus-visible:ring-offset-2"
            style={{ filter: "brightness(0.9)" }}
          />

          {/* overlay the image with a grain texture */}
          {/* <div className="absolute inset-0 bg-[url('/grain-texture-image.svg')] opacity-30" /> */}

          {/* small dark overlay over the top and bottom of img to make the info readable */}
          <div className="absolute inset-0  bg-gradient-to-t from-black/80 via-transparent to-black/20" />

          {/* overlay the image with some info */}

          <DetailsOnMediaCard
            title={title}
            rating={mediaDetails.vote_average}
            date={date}
            runtime={runtime}
            numberOfSeasons={numberOfSeasons}
            showRating={false}
            showYear={true}
          />
        </AspectRatio>
      </Link>
    </motion.li>
  );
};

export default HorizontalMotionMediaCard;
