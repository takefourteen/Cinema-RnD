import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchImages } from "@/lib/tmdb-api/images";

import { AiOutlineInfoCircle as InfoIcon } from "react-icons/ai";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { DetailsButton } from "@/components/DetailsButton";
import ImdbRating from "../ImdbRating";
import Overview from "../Overview";
import TitleLogo from "../TitleLogo";

type ShowDetailsLargeScreenProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const ShowDetailsLargeScreen = async ({
  movieOrTvShowDetails,
}: ShowDetailsLargeScreenProps) => {
  /* 
  const type that determines if the data is of movieDetails or tvSeriesDetails
  */
  const type: "movie" | "tv" = isMovieDetails(movieOrTvShowDetails)
    ? "movie"
    : "tv";

  // fetch the images for the movie or tv show
  const imagesPromise = fetchImages(movieOrTvShowDetails.id, type);

  // wait for the promise to resolve
  const images = await imagesPromise;

  // look for the first images.logos with a file_path
  const titleLogo = images?.logos.find((logo) => logo.file_path);

  /*
  use type guard functions to determine if the data is of movieDetails.
  then get the title of the movie or tv show 
  */
  const movieOrTvShowTitle = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.original_title
    : movieOrTvShowDetails.original_name;

  /* 
    use type guard functions to determine if the data is of movieDetails.
    then get the release date in the format of 2021
    */
  const releaseDate = isMovieDetails(movieOrTvShowDetails)
    ? movieOrTvShowDetails.release_date
    : movieOrTvShowDetails.first_air_date;

  // encoded link href to the details page of the movie or tv show
  // const linkHref = `/${isMovieDetails(movieOrTvShowDetails) ? "movie" : "tv"}/${
  //   movieOrTvShowDetails.id
  // }`;

  const linkHref = `/${type}/${movieOrTvShowDetails.id}-${encodeURIComponent(
    movieOrTvShowTitle || "",
  )}`;

  //   get the runtime for the movie or tv show in the format of 1h 30m, or 1h, or 30m
  let runtime;
  if (isMovieDetails(movieOrTvShowDetails)) {
    // if the runtime is NaN, set it to an empty string
    runtime = isNaN(movieOrTvShowDetails.runtime)
      ? ""
      : `${Math.floor(movieOrTvShowDetails.runtime / 60)}h ${
          movieOrTvShowDetails.runtime % 60
        }m`;
  } else {
    // dont show runtime for tv shows
    runtime = null;
  }

  // vote average rounded to one decimal place
  const voteAverage = Math.round(movieOrTvShowDetails.vote_average * 10) / 10;

  return (
    <div className="master-container hidden h-[85%] flex-col items-center justify-end gap-y-2 text-center md:items-start  md:text-start md:flex lg:mr-auto lg:max-w-[80%]">
      {/*
        -------------------------------------------- 
        Title Text or Title Logo
        -------------------------------------------- 
        */}
      {titleLogo ? (
        <TitleLogo logoData={titleLogo} alt={movieOrTvShowTitle} />
      ) : (
        // Title
        <h1 className="max-w-[32rem] text-[32px] font-bold md:text-[36px] lg:text-[40px]">
          {movieOrTvShowTitle}
        </h1>
      )}

      {/* Year, runtime, and Rating */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2 tracking-wide lg:mt-4">
        {/* Year */}
        <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
          {new Date(releaseDate).getFullYear()}
        </p>

        {/* display runtime, if it is not falsey */}
        {runtime && (
          <span className="flex items-center gap-2">
            <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
            <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
              {runtime}
            </p>
          </span>
        )}

        {/* if it is a series, display no. of seasons */}
        {!isMovieDetails(movieOrTvShowDetails) && (
          <span className="flex items-center gap-2">
            <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
            <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
              {/* 1 Season or Seasons if more than 1 */}
              {movieOrTvShowDetails.number_of_seasons}{" "}
              {movieOrTvShowDetails.number_of_seasons > 1
                ? "Seasons"
                : "Season"}
            </p>
          </span>
        )}

        {/* Rating */}
        <span className=" h-[5px] w-[5px] rounded-full bg-white/80" />
        <ImdbRating rating={voteAverage} />
      </div>

      {/* Overview of movie or tv series */}
      <div className="mt-2">
        <Overview overview={movieOrTvShowDetails.overview} />
      </div>

      {/* play, info, add to lib btns, And production company logo*/}
      <div className="mt-2 flex h-max w-full items-center   gap-x-2 lg:mt-4 ">
        {/* play button */}
        {/* if its a movie, href is movie/:id, if tv, href is tv/:id */}
        <DetailsButton asChild className=" h-10 font-button-text">
          <Link href={`${linkHref}`}>
            <PlayIcon className="mr-1 h-8 w-8" /> Play
          </Link>
        </DetailsButton>

        {/* info button */}
        <Link href={`${linkHref}`}>
          <DetailsButton className="flex h-10  items-center justify-center gap-x-2 bg-[#2B2B2D] font-button-text text-white transition-colors hover:bg-[#2B2B2D]/70  hover:text-white/70">
            <InfoIcon className=" h-7 w-7 " />
            <span>Details</span>
          </DetailsButton>
        </Link>
      </div>
    </div>
  );
};

export default ShowDetailsLargeScreen;

/*
<span className="mx-1 h-[5px] w-[5px] rounded-full bg-white/80" />

{movieOrTvShowDetails.genres.slice(0, 2).map((genre, index) => (
  <Chip key={genre.id}>{genre.name}</Chip>
))}

   <DetailsButton
   variant={"outline"}
   className="flex flex-col items-center justify-center gap-y-1 border-none p-0   text-white transition-colors hover:bg-transparent hover:text-white/70"
 >
   <AddIcon className=" h-6 w-6 rounded-full border border-white/50" /> <span>Library</span>
 </DetailsButton>
*/
