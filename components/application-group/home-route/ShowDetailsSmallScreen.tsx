import React from "react";
import Link from "next/link";

import { slugify } from "@/helpers/slugify";
import { isMovieDetails } from "@/lib/tmdb-api/movies";
import { fetchImages } from "@/lib/tmdb-api/images";

import { IoMdAdd as AddIcon } from "react-icons/io";
// import { IoInformation as InfoIcon } from "react-icons/io5";
import { BsFillPlayFill as PlayIcon } from "react-icons/bs";
import { AiOutlineInfo as InfoIcon } from "react-icons/ai";
import { DetailsButton } from "@/components/DetailsButton";
import ImdbRating from "../ImdbRating";
import TitleLogo from "../TitleLogo";
import ImageLoader from "@/components/ImageLoader";

type ShowDetailsSmallScreenProps = {
  movieOrTvShowDetails: MovieDetailsData | TVSeriesData;
};

const BASE_IMG_URL = process.env.NEXT_PUBLIC_OG_TMBD_IMG_PATH;

const ShowDetailsSmallScreen = async ({
  movieOrTvShowDetails,
}: ShowDetailsSmallScreenProps) => {
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

  // look for the first production company that has a logo path
  const productionCompany = movieOrTvShowDetails.production_companies.find(
    (company) => company.logo_path,
  );

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
  const detailsUrl = `/${type}/${slugify(movieOrTvShowTitle)}-${
    movieOrTvShowDetails.id
  }`;

  // play movie href to watch page of the movie or tv show
  let playUrl: string = "";
  if (type === "movie") {
    playUrl = `/watch-movie/${slugify(movieOrTvShowTitle)}-${
      movieOrTvShowDetails.id
    }`;
  } else if (type === "tv") {
    playUrl = `/watch-tv/${slugify(movieOrTvShowTitle)}-${
      movieOrTvShowDetails.id
    }/?season=${1}&episode=${1}`;
  }

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
    <div className="master-container flex h-full flex-col items-center justify-end gap-y-2 pb-12 text-center text-white md:hidden md:items-start  md:text-start ">
      {/*
        -------------------------------------------- 
        Production logo and Title Text or Title Logo
        -------------------------------------------- 
        */}
      {titleLogo ? (
        <TitleLogo logoData={titleLogo} alt={movieOrTvShowTitle} />
      ) : (
        <>
          {/* Production company logo if not null*/}
          {productionCompany?.logo_path && (
            <div>
              <div className="relative min-h-[40px] w-[150px] lg:h-[100px] lg:w-[200px]">
                <ImageLoader
                  loaderType="skeleton"
                  src={`${BASE_IMG_URL}${productionCompany.logo_path}`}
                  alt={productionCompany.name}
                  fill
                  sizes="300px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
          {/* Title */}
          <h1 className="max-w-[32rem] text-[32px] font-bold md:text-[36px] lg:text-[40px]">
            {movieOrTvShowTitle}
          </h1>
        </>
      )}

      {/* Year, runtime, and Rating */}
      <div className=" mt-2 flex flex-wrap items-center justify-center gap-2 tracking-wide md:mt-4">
        {/* Year */}
        <p className="rounded-sm border border-white/30 px-1 text-primaryWhite">
          {new Date(releaseDate).getFullYear()}
        </p>

        {/* display runtime, if it is not NaN, */}
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

      {/* play and info btns */}
      <div className="mt-6 flex h-max w-full items-start justify-center gap-x-10 md:gap-x-12 lg:mt-4 ">
        {/* add to library button */}
        <DetailsButton
          variant={"outline"}
          className="flex flex-col items-center justify-center gap-y-1 border-none p-0   text-white transition-colors hover:bg-transparent hover:text-white/70"
        >
          <AddIcon className=" h-6 w-6 rounded-full ring-1 ring-offset-1" />{" "}
          <span>Library</span>
        </DetailsButton>

        {/* play button */}
        <DetailsButton asChild className=" font-button-text h-10 px-8 ">
          <Link href={`${playUrl}`}>
            <PlayIcon className="mr-1 h-8 w-8 " /> Play
          </Link>
        </DetailsButton>

        {/* info button */}
        <DetailsButton
          variant={"outline"}
          asChild
          className=" flex flex-col items-center justify-center gap-y-1 border-none p-0 text-white transition-colors hover:bg-transparent hover:text-white/70"
        >
          <Link href={`${detailsUrl}`}>
            <InfoIcon className=" h-6 w-6 rounded-full p-[1px] ring-1 ring-offset-1  " />{" "}
            <span>Details</span>
          </Link>
        </DetailsButton>
      </div>
    </div>
  );
};

export default ShowDetailsSmallScreen;
